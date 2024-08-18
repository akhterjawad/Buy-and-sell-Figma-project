import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "../config.js";
const provider = new GoogleAuthProvider();


let form = document.querySelector('#form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let googleBtn = document.querySelector('.googlelogin');
let loginBtn = document.querySelector('#loginBtn');

form.addEventListener('submit', event => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
            loginBtn.innerHTML = `<img class="loading" src="./image/loading.gif" alt="no img">`
            const user = userCredential.user;
            Swal.fire({
                title: 'Success!',
                text: 'You are logged in successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '../index.html';
                    }
                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        });
});


// googleBtn.addEventListener(`click`, () => {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             // IdP data available using getAdditionalUserInfo(result)
//             // ...
//             console.log(user);
//             window.location = `home.html`;
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//             console.log(credential);

//         });
// });