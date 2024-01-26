import '../bootstrap';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import QuestionEditor from '../Componets/questionEditor'
import QuizDisplayEditor from '../Componets/quizDisplayEditor'

function Page() {
    const [quizData, setQuizData] = useState(null);
    const [quizIndex, setQuizIndex] = useState(-1);

    useEffect(() => {
        const id = getQuizId();
        getQuizData(id);
    }, [])

    function getQuizId() {
        const url = window.location.href.split("/");
        const id = (url[url.length - 1]);
        return id;
    }

    async function getQuizData(id) {
        try {
            const response = await fetch('http://localhost:8000/api/getQuiz/'+id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            data.questions = await JSON.parse(data.questions);

            setQuizData(data);
        } catch (error) {}
    }

    async function updateQuiz() {
        try {
            await fetch('http://localhost:8000/api/updateQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizData: quizData
                })
            });
        } catch (error) {}
    }

    async function newQuestion() {
        const newQuestions = [...quizData.questions, {text: "question", img: null, type: "radio", answers: ["answer"], correctAnswers: []}];
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.questions = newQuestions;
            return updatedQuiz;
        });
    }

    async function deleteQuestion(event, i) {
        event.stopPropagation();
        if(quizData.questions.length == 1) return;
        if(quizIndex == i) setQuizIndex(quizIndex - 1);
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.questions.splice(i, 1);
            return updatedQuiz;
        });
    }

    async function deleteQuiz() {
        try {
            await fetch('http://localhost:8000/api/deleteQuiz/' + quizData.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            location.href = '/';
        } catch (error) {}
    }

    const updateQuestion = (question) => {
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.questions[quizIndex] = question;
            return updatedQuiz;
        });
    }

    return (
        <>
            {
                quizData != null && 
                <>
                    <br></br>
                    {quizIndex == -1 && 
                        <QuizDisplayEditor quiz={quizData} setQuizData={setQuizData}></QuizDisplayEditor>}
                    {quizIndex >= 0 &&
                        <QuestionEditor question={quizData.questions[quizIndex]} updateQuestion={updateQuestion}></QuestionEditor>}
                    <div className='questionList'>
                        <button className='questionButton' onClick={() => setQuizIndex(-1)}>Home</button>
                        {quizData.questions != [] && <>
                            {quizData.questions.map((question, i) => (<>
                            <button className='questionButton' onClick={() => setQuizIndex(i)}>
                                {i + 1}
                                <button  className='deleteQuestion' onClick={(e) => deleteQuestion(e, i)}>X</button>
                            </button>
                            </>))}
                        </>}
                        <button className='questionButton' onClick={() => newQuestion()}>+</button>
                    </div>
                    <button style={{left: "10%", backgroundColor: "blue"}} className='superbtn' onClick={() => updateQuiz()}>Save</button>
                    <button style={{right: "10%", backgroundColor: "red"}} className='superbtn' onClick={() => deleteQuiz()}>Delete</button>
                </>
            }
        </>
    )
}
ReactDOM.render(<Page />, document.getElementById('view'));