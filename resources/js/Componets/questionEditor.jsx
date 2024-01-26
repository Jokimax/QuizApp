import React from 'react';

export default function QuestionEditor({question, updateQuestion}) {

    async function updateImage() {
        const input = document.getElementById("img");
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(){
                var output = document.getElementById('imageDisplay');
                output.src = reader.result;
                question.img = reader.result;
            }
            reader.readAsDataURL(file);
        } else {
            question.img = null;
            var output = document.getElementById('imageDisplay');
            output.src = null;
        }
        updateQuestion(question);
    }

    async function deleteImage() {
        question.img = null;
        var output = document.getElementById('imageDisplay');
        output.removeAttribute('src');
        updateQuestion(question);
    }

    async function updateText() {
        question.text = document.getElementById('description').value;
        updateQuestion(question);
    }

    async function newAnswer() {
        question.answers.push("answer");
        updateQuestion(question);
    }

    async function updateAnswer(i) {
        question.answers[i] = document.getElementById('answer' + i).value;
        updateQuestion(question);
    }

    async function deleteAnswer(i) {
        if(question.answers.length == 1) return;
        question.answers.splice(i, 1);
        updateQuestion(question);
    }

    async function updateCorrectAnswers(i) {
        var correctAnswers = question.correctAnswers;
        if(question.type == "radio") correctAnswers = [i];
        else{
            if(correctAnswers.includes(i)) correctAnswers.splice(correctAnswers.indexOf(i), 1);
            else correctAnswers.push(i);
        }
        question.correctAnswers = correctAnswers;
        updateQuestion(question);
    }

    async function changeQuestionType() {
        if(question.type == "radio") question.type = "checkbox";
        else {
            question.correctAnswers = [question.correctAnswers[0]]
            question.type = "radio";
        }
        updateQuestion(question);
    }

    return (
        <>
            <div><input className='questionDescription' type="text" id="description" value={question.text} onChange={() => updateText()}></input></div>
            <div className='questionImageBox'>
                {question.img != null &&<>
                    <img className='questionImage' id="imageDisplay" src={question.img}></img>
                </>}
                {question.img == null &&<>
                    <img className='questionImage' id="imageDisplay"></img>
                </>}
            </div>
            <br></br>
            <input type="file" id="img" accept="image/*" onChange={() => updateImage()} className='btn'></input>
            <button onClick={() => deleteImage()} className='btn'>Remove Image</button>
            <hr></hr>
            {question.answers.map((answer, i) => (<>
                <input name="answer" type={question.type} onChange={() => updateCorrectAnswers(i)} checked={question.correctAnswers.includes(i)}></input>
                <input className='answer' type="text" id={"answer" + i} value={answer} onChange={() => updateAnswer(i)}></input>
                <button style={{width: '10%'}} onClick={() => deleteAnswer(i)} className='btn'>Delete Answer {i + 1}</button>
                <br></br>
            </>))}
            <button onClick={() => newAnswer()} className='btn'>New Answer</button>
            <button onClick={() => changeQuestionType()} className='btn'>Change Type</button>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br>
        </>
    )
}