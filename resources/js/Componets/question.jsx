import React from 'react';

export default function Question({question, setAnswers, answers, completedQuiz, index, correctAnswers}) {

    async function updatePickedAnswers(i) {
        if(completedQuiz) return false;
        if(question.type == "radio"){
            setAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[index] = [i];
                return updatedAnswers;
            });
        }
        else{
            setAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                if(updatedAnswers[index].includes(i)) updatedAnswers[index].splice(updatedAnswers[index].indexOf(i), 1);
                else updatedAnswers[index].push(i);
                return updatedAnswers;
            });
        }
    }

    if (question != null) return ( <>
        <div className='questionDescription'>{question.text}</div>
        <div className='questionImageBox'>
            <img className='questionImage' src={question.img}></img>
        </div>
        <hr></hr>
        {question.answers.map((answer, i) => (<>
            <input name="answer" type={question.type} id={"answer"+i} onChange={() => updatePickedAnswers(i)} checked={answers.includes(i)}></input>
            <label htmlFor={"answer"+i}>{answer}</label>
            <br></br>
        </>))}
        {completedQuiz &&<>
            <br></br>
            <h2>Correct Answer</h2>
            <hr></hr>
            <div>{question.answers.map((answer, i) => (<>
                <input name="correctAnswer" type={question.type} id={"answer"+i} onChange="return false;" checked={correctAnswers[index].includes(i)}></input>
                <label htmlFor={"answer"+i}>{answer}</label>
                <br></br></>))}
            </div>
            </>}
    </> )
}