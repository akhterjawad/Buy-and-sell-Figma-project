import {
    collection,
    getDocs,
    addDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { storage, auth, db } from "../config.js"; // Importing necessary Firebase modules and configurations

let uid; // Variable to store the user's unique ID
let logoutButton;
let loginBtn = document.querySelector('#divLogin');
let usersDataArray = [];


// Monitor the authentication state of the user
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        console.log(uid);
        loginBtn.innerHTML=''
    } else {
        console.log(`User is signed out`);
        alert('please login first then you can buy')
        window.location = `../login.html`;
    }
});





async function GetUserDataFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
                usersDataArray.push(doc.data());
                console.log(usersDataArray);
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
                        <a class="justify-between" href="./addpost.html">
                            Add a post
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a id="button" class="button ">Logout</a></li>
                </ul>
            </div>`;
            logoutButton = document.querySelector('#button');
        });
        Logout()
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
};
function Logout() {
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log(`Sign-out successful.`);
            window.location = `../login.html`;
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    });
};
GetUserDataFromFirestore();