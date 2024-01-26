import '../bootstrap';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Question from '../Componets/question'

var quizId;

function Page() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizSize, setQuizSize] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [completedQuiz, setCompletion] = useState(false);
    const [correctAnswers, setCorrect] = useState(null);
    const [score, setScore] = useState(null);

    useEffect(() => {
        quizId = getQuizId();
        getQuizSize();
    }, [])

    useEffect(() => {
        if(questions[questionIndex] == null) getQuestion(questionIndex);
    }, [questionIndex])

    function getQuizId() {
        const url = window.location.href.split("/");
        const id = (url[url.length - 1]);
        return id;
    }

    async function getQuizSize() {
        try {
            const response = await fetch('http://localhost:8000/api/getQuizSize/' + quizId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const quiz = await response.json();

            setQuizSize(quiz.size);
        } catch (error) {}
    }

    async function getQuestion(index) {
        try {
            const response = await fetch('http://localhost:8000/api/getQuestion/' + quizId + '/' + index, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            setAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers.push([]);
                return updatedAnswers;
            });

            setQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions.push(data);
                return updatedQuestions;
            });
        } catch (error) {}
    }

    async function submitQuiz(){
        try {
            const response = await fetch('http://localhost:8000/api/completeQuiz/' + quizId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: answers
                })
            });

            const data = await response.json();

            setScore(data.score);
            setCorrect(data.correctAnswers);
            setCompletion(true);
        } catch (error) {}
    }

    return (
        <>
            {quizSize != 0 &&<>
                {questionIndex > 0 &&
                    <button style={{left: "10%", backgroundColor: "blue"}} className='superbtn' onClick={() => setQuestionIndex(questionIndex - 1)}>Prev</button>}
                {questions[questionIndex] != null && <>
                    {questionIndex < quizSize - 1 &&
                        <button style={{right: "10%", backgroundColor: "red"}} className='superbtn' onClick={() => setQuestionIndex(questionIndex + 1)}>Next</button>}
                    {questionIndex == quizSize - 1 && !completedQuiz &&
                        <button style={{right: "10%", backgroundColor: "red"}} className='superbtn' onClick={() => submitQuiz()}>Done</button>}
                </>}
                <Question question={questions[questionIndex]} setAnswers={setAnswers} answers={answers[questionIndex]} 
                completedQuiz={completedQuiz} index={questionIndex} correctAnswers={correctAnswers}></Question>
            </>}
            {completedQuiz &&
                <h2 className='score'>Score: {score}/{quizSize}</h2>}
        </>
    )
}
ReactDOM.render(<Page />, document.getElementById('view'));