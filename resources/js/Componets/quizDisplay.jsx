import React from 'react';

export default function QuizDisplay({quiz}) {
    return (
        <div className='quiz'>
            <div className='quizName'>{quiz.name}</div>
            <div className='quizInfo'>
                {quiz.image != null && <div className='imageContainer'>
                    <img className='quizImage' src={quiz.image}></img>
                </div>}
                <div className='descriptionContainer'>
                    <p className='quizDescription'>{quiz.description}</p>
                    <button className='quizButton' onClick={() => location.href = "edit/" + quiz.id}>Edit</button>
                    <button className='quizButton' onClick={() => location.href = "quiz/" + quiz.id}>Play</button>
                </div>
            </div>
        </div>
    )
}