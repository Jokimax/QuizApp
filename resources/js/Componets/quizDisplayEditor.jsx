import React from 'react';

export default function QuizDisplayEditor({quiz, setQuizData}) {
    async function updateImage() {
        const input = document.getElementById("img");
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(){
                var output = document.getElementById('imageDisplay');
                output.src = reader.result;
                setQuizData((prevQuiz) => {
                    const updatedQuiz = {...prevQuiz};
                    updatedQuiz.image = reader.result;
                    return updatedQuiz;
                });
            }
            reader.readAsDataURL(file);
        } else {
            var output = document.getElementById('imageDisplay');
            output.src = null;
            setQuizData((prevQuiz) => {
                const updatedQuiz = {...prevQuiz};
                updatedQuiz.image = null;
                return updatedQuiz;
            });
        }
    }

    async function deleteImage() {
        var output = document.getElementById('imageDisplay');
        output.removeAttribute('src');
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.image = null;
            return updatedQuiz;
        });
    }

    async function updateName() {
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.name = document.getElementById("name").value;
            return updatedQuiz;
        });
    }

    async function updateDescription() {
        setQuizData((prevQuiz) => {
            const updatedQuiz = {...prevQuiz};
            updatedQuiz.description = document.getElementById("description").value;
            return updatedQuiz;
        });
    }

    return (
        <>
            <div className='quiz'>
                <input className='quizName' type="text" id="name" value={quiz.name} onChange={() => updateName()}></input>
                <div className='quizInfo'>
                    <div className='imageContainer'>
                        <img src={quiz.image} className='quizImage' id="imageDisplay"></img>
                    </div>
                    <div className='quizDescriptionContainer'>
                        <textarea className='quizDescription' id="description" onChange={() => updateDescription()}>{quiz.description}</textarea>
                    </div>
                </div>
            </div>
            <br></br>
            <input className='btn' type="file" id="img" accept="image/*" onChange={() => updateImage()}></input>
            <button className='btn' onClick={() => deleteImage()}>Remove Image</button>
        </>
    )
}