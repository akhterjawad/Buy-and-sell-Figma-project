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
let usersDataArray = [];
let uid;
let logoutButton;
let productscards = document.querySelector('#productscards')
let allproducts = [];
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



async function GetUserDataFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().Uid === uid) {
                usersDataArray.push(doc.data());
                console.log(usersDataArray);
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
            }
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

async function getCard() {
    // const q = query(collection(db, "userproducts"), where("uid", "==", User.uid));
    let querySnapshot = await getDocs(collection(db, "userproducts"));
    querySnapshot.forEach((doc) => {
        allproducts.push(doc.data())
        // console.log(doc.data());
        // console.log(allproducts);     
    });
    renderproducts(allproducts)
}
getCard()
console.log(allproducts);


// productscards.inn
async function renderproducts(array) {
    console.log(array);

    await array.forEach((item) => {
        productscards.innerHTML += `<div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
  <img class="w-full h-56 object-cover" src="${item.productdimage}" alt="Product Image">
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">${item.productTitle}</h2>
      <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">${item.ownername}</span>
    </div>
    <p class="text-gray-700 mb-4">${item.ProductionDescription}</p>
    <h3 class="text-lg font-medium text-gray-800">Phone: ${item.ownernumber}</h3>
    <div class="flex justify-between items-center mt-6">
      <h2 class="text-xl font-bold text-primary">$${item.productdprice}</h2>
      <button id="buyNowbtn" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Buy Now</buttonid>
    </div>
  </div>
</div>
`
    })
}

