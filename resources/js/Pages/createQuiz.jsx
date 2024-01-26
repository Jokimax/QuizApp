import '../bootstrap';

import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function Page(){
    const [imageData, setImageData] = useState(null);

    async function onChangeImage() {
        const input = document.getElementById("img");
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(){
                setImageData(reader.result);
                var output = document.getElementById('imageDisplay');
                output.src = reader.result;
            }
            reader.readAsDataURL(file);
        } else {
            setImageData(null);
        }
    }

    async function createQuiz() {
        try {
            const response = await fetch('http://localhost:8000/api/createQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    description: document.getElementById("description").value,
                    image: imageData
                })
            });
            
            const data = await response.json();
            location.href = 'edit/' + data.id;
        } catch (error) {}
    }
    
    return (
        <>
            <div className='quiz'>
                <input className='quizName' type="text" id="name"></input>
                <div className='quizInfo'>
                    <div className='imageContainer'>
                        {imageData != null && <img className='quizImage' id="imageDisplay"></img>}
                    </div>
                    <div className='descriptionContainer'>
                        <textarea className='description' id="description"></textarea>
                    </div>
                </div>
            </div>
            <input type="file" id="img" accept="image/*" onChange={() => onChangeImage()} hidden={true}></input>
            <label style={{left: '35%'}} className='btn' htmlFor="img">Upload Image</label>
            <button style={{left: '45%'}} className='btn' onClick={() => setImageData(null)}>Remove Image</button>
            <input style={{left: '60%'}} className='btn' type="submit" value="Create Quiz" onClick={() => createQuiz()}></input>
        </>
    )
}
ReactDOM.render(<Page />, document.getElementById('view'));