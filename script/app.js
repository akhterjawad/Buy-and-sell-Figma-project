import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    getDocs,
    collection,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth, db } from "../config.js";
let loginBtn = document.querySelector('#divLogin');
let uid;
let button;
let array = [];
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        uid = user.uid;
        console.log(uid);
        loginBtn.innerHTML = ``
    } else {
        console.log(`User is signed out`);
        // window.location = `../login.html`;
        // User is signed out
        // ...
    }
});



async function GetDataFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().Uid === uid) {
                array.push(doc.data());
                console.log(array);
                console.log(doc.data());
                loginBtn.innerHTML = `${doc.data().firstname} ${doc.data().lastname }<div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="${doc.data().userimage}"/>
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a id="button" class="button ">Logout</a></li>
                </ul>
            </div>`;
            }
            button = document.querySelector('#button');
        });
        Logout()
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
};
function Logout() {
    button.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log(`Sign-out successful.`);
            window.location = `../login.html`;
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    });
};
GetDataFromFirestore();