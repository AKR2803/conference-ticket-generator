'use strict';

const fileInput = document.getElementById('file-upload');

// input file validation
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const preview = document.querySelector('.file-upload-preview img');
    const infoLabel = document.getElementById('info-label');
    const uploadInstruction = document.getElementById('upload-instruction');
    const validTypes = ['image/jpeg', 'image/png'];
    const maxFileSize = 500 * 1024;  // 500KB
    
    console.log(file);
    
    // if no file selected
    if(!file && !preview.src){
        infoLabel.textContent = "No file selected";
        infoLabel.style.color = "#ff2525";
        return;
    }
    
    // if invalid file type
    if(!validTypes.includes(file.type)){
        infoLabel.textContent = "Invalid file type. Please select JPEG or PNG file."
        infoLabel.style.color = "#ff2525";
        return;
    }
    
    if(file.size > maxFileSize){
        infoLabel.textContent = "ⓘFile too large. Please upload a photo under 500KB."   
        infoLabel.style.color = "#ff2525";
        preview.src = "./assets/images/icon-upload.svg";
        uploadInstruction.textContent = "Drag and drop or click to upload";
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e){
        preview.src = e.target.result;
        uploadInstruction.textContent = "";
        infoLabel.textContent = "File successfully uploaded.";
        infoLabel.style.color = "#0fff0f";
    }
    reader.readAsDataURL(file);
});


const myform = document.querySelector('form');

// form validation

myform.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('user-email').value;
    const fullName = document.getElementById('full-name').value;
    const githubUsername = document.getElementById('github-username').value;
    const fileInput = document.getElementById('file-upload');
    const infoLabel = document.getElementById('info-label');

    // no file uploaded
    if(fileInput.files.length == 0){
        infoLabel.style.color = "#ff2525";
        return;
    }

    // file uploaded
    else if(fileInput.files.length != 0){   
        console.log("Submit Form. Now redirecting...");
        console.log(window.location.href);

        // store image, and form data in localStorage
        const reader = new FileReader();

        reader.onload = function(e){
            localStorage.setItem("avatar", e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
        
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", email);
        localStorage.setItem("githubUsername", githubUsername);
        
        window.location.href = "confirmation.html"; // redirect to confirmation.html
    }
    
    else{
        console.log("Form submission failed");;
        return;
    }
});