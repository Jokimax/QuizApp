import '../bootstrap';

import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import QuizDisplay from '../Componets/quizDisplay';

var lastQuizId = 0;

function Page() {
    const [quizzes, setQuizzes] = useState([]);
    const [quizzesLeft, setQuizzesLeft] = useState(true);
    const quizzesRef = useRef(quizzes);

    useEffect(() => {
        quizzesRef.current = quizzes;
    }, [quizzes])

    useEffect(() => {
        loadQuizzes();
    }, [])
    
    function getQuizById(id) {
        var start = 0, end = [...quizzesRef.current].length - 1;
        while(start <= end){
            const mid = Math.floor((start + end) / 2);

            if ([...quizzesRef.current][mid].id == id) return mid;
            else if ([...quizzesRef.current][mid].id < id) start = mid + 1;
            else end = mid - 1;
        }
        return null;
    }
    
    async function loadCoverImage(id) {
        try {
            const response = await fetch('http://localhost:8000/api/getCoverImage/'+id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const image = await response.text();
            if(image == "") return;
            
            const index = getQuizById(id);
            if (index !== null) {
                setQuizzes((prevQuizzes) => {
                    const updatedQuizzes = [...prevQuizzes];
                    updatedQuizzes[index].image = image;
                    return updatedQuizzes;
                });
            }
        } catch (error) {}
    }
    
    async function loadQuizzes() {
        try {
            const response = await fetch('http://localhost:8000/api/getQuizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: lastQuizId
                })
            });
            
            const data = await response.json();
            const newQuizzes = data.quizzes;
            setQuizzesLeft(data.quizLeft);
            setQuizzes(quizzes.concat(newQuizzes));
            newQuizzes.forEach(async quiz => {
                loadCoverImage(quiz.id);
            });
            lastQuizId = newQuizzes[newQuizzes.length - 1].id;
        } catch (error) {}
    };
    
    return (
        <>
            <button className='homepageButton' onClick={() => location.href = "/createQuiz"}>Create New</button>
            <br></br>
            {quizzes.map((quiz, i) => (<QuizDisplay quiz={quiz}></QuizDisplay>))}
            {quizzesLeft && <>
                <br></br>
                <button className='homepageButton' onClick={() => loadQuizzes()}>Load More</button>
            </>}
        </>
    )
}
ReactDOM.render(<Page />, document.getElementById('view'));