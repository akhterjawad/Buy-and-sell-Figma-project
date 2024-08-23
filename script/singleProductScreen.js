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
let randerDiv = document.querySelector('#randerDiv');
let productTitleh2 = document.querySelector('#productTitle');
// let addToCart = document.querySelector('#addToCart');
let usersDataArray = [];
let productarray = JSON.parse(localStorage.getItem('products'));

console.log(productarray);

// Monitor the authentication state of the user
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        console.log(uid);
        loginBtn.innerHTML = ''
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
            console.log(doc.data());
            loginBtn.innerHTML = `${doc.data().firstname} ${doc.data().lastname}<div class="dropdown dropdown-end">
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
productTitleh2.innerHTML=productarray[0].productTitle
function rander() {
    randerDiv.innerHTML = ` <div class="max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded shadow-lg overflow-hidden flex flex-col md:flex-row" id="randerDiv">
           

            <div class="relative flex justify-center w-full md:w-1/2">
    <img src="${productarray[0].productdimage}" alt="iPhone XS"
         class="p-2 md:p-4 w-[100%] object-cover">
</div>


            <div class="p-6 md:w-1/2">
                <!-- Price and Title Section -->
                <div class="text-2xl font-bold text-gray-800">Rs ${productarray[0].productdprice}</div>
                <div class="text-lg text-gray-600">${productarray[0].productTitle}</div>
                <div class="text-sm text-gray-500 mt-2">${productarray[0].ProductionDescription}</div>


                <div class="mt-4 flex items-center">
                    <div class="rounded-full flex items-center justify-center bg-gray-200 p-2">
                        <img src="${productarray[0].usersDataArray[0].userimage}" class="w-[20px] rounded-full h-[30px]"  alt="">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-bold text-gray-800">${productarray[0].ownername}</div>
                        <div class="text-xs text-gray-500">Member since June 2024</div>
                    </div>
                </div>


                <div class="mt-6 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                    <button class="bg-purple-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto">${productarray[0].ownernumber}</button>
                    <button class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg w-full sm:w-auto">Chat</button>
                </div>


                <div class="mt-6">
                    <button class="bg-purple-700 text-white w-full py-2 rounded-lg" id="addToCart">Add to Cart</button>
                </div>


                <div class="mt-4 text-sm text-gray-500 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5.121 18.364l.707-.707a8 8 0 1111.314 0l.707.707m-6.364-6.364a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    Fb Area Karachi
                </div>
            </div>
        </div>


        <div
            class="max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded shadow-lg overflow-hidden mt-6">
            <div class="p-6 border-t border-gray-200">
                <h2 class="text-lg font-semibold text-gray-800">Details</h2>
                <div class="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                    <div>Is Deliverable:</div>
                    <div>No</div>
                    <div>Price:</div>
                    <div>${productarray[0].productdprice}</div>
                    <div>Condition:</div>
                    <div>Used</div>
                </div>
            </div>
        </div>


        <div
            class="max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded shadow-lg overflow-hidden mt-6">
            <div class="p-6 border-t border-gray-200">
                <h2 class="text-lg font-semibold text-gray-800">Description</h2>
                <p class="mt-2 text-sm text-gray-600">${productarray[0].ProductionDescription}</p>
            </div>
        </div>`
};
rander();

document.addEventListener('DOMContentLoaded', (event) => {
    let addToCart = document.querySelector('#addToCart');
    addToCart.addEventListener('click', () => {
        alert(`Your product is now on the way`);
    });
});
