import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
    uploadBytes,
    getDownloadURL,
    ref
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

import { auth, db, storage } from "../config.js";


let form = document.querySelector('#form');
let email = document.querySelector('#email');
let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let password = document.querySelector('#password');
let registerBtn = document.querySelector('#registerBtn');
let userimage = document.querySelector('#userimage');

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         console.log(uid);
//         console.log(`User is login`);
//         window.location = `../dashbord.html`;
//     } else {
//         console.log(`User is not login`);

//         // User is signed out
//         // ...
//     }
// });

let array = [];

form.addEventListener('submit', async event => {
    event.preventDefault();
    registerBtn.disabled = true
    registerBtn.innerHTML = `<img class="loading" src="./image/loading.gif" alt="no img">`
    let userimageurl = await showUrl(userimage);
    if (email.value === '' && password.value === '' && firstname.value === '' && lastname.value === '' && !userimage.files.length) {
        alert('Please fill in the input fields');
        return;
    }
    try {
        // Create a new user account with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        const docRef = await addDoc(collection(db, "users"), {
            userimage: userimageurl,
            email: email.value,
            firstname: firstname.value,
            lastname: lastname.value,
            Uid: user.uid
        });

        console.log("Document written with ID: ", docRef.id);
        array.push({
            firstname: firstname.value,
            lastname: lastname.value
        })
        Swal.fire({
            title: 'Success!',
            text: 'Your account registered successfully!',
            icon: 'success',
            confirmButtonText: 'register'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = "../login.html";
                }
            });

        // alert('You are registered');
        // window.location = '../login.html';
        registerBtn.disabled = false
    } catch (error) {
        console.error("Error during registration: ", error);
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        // email.value = '';
        // password.value = '';
        // firstname.value = '';
        // lastname.value = '';
    }
    registerBtn.innerHTML = `Register`;
});


async function showUrl(profile) {
    const files = profile.files[0]
    const storageRef = ref(storage, email.value);


    try {
        const uplordimage = await uploadBytes(storageRef, files);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        return url

    } catch (error) {
        console.log(error);

    }

}
