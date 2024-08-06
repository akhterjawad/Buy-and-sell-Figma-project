import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";


let form = document.querySelector('#form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
form.addEventListener('submit', event => {
    event.preventDefault();


    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert('You are registered');
            console.log(user);
            window.location = `index.html`;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (email.value == '' && password.value == '') {
                alert('Please fill in the input fields');
            } else {
                alert(errorMessage);
            }
            email.value = '';
            password.value = '';
        });
});