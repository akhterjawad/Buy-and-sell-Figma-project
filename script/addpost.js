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

// JavaScript to handle the click event
let productimage = document.querySelector('#productimage'); // Select the product image element
let form = document.querySelector(`#form`);
let productTitle = document.querySelector(`#productTitle`);
let ProductionDescription = document.querySelector(`#ProductionDescription`);
let productdprice = document.querySelector(`#price`);
let ownername = document.querySelector(`#yourName`);
let ownernumber = document.querySelector(`#yourNumber`);
let logoutButton;
let addBtn = document.querySelector(`#addBtn`);
let loginBtn = document.querySelector('#divLogin');
let usersDataArray = [];
let isLoggingOut = false; // Flag to indicate if the user is logging out

// Monitor the authentication state of the user
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    loginBtn.innerHTML = ''
  } else if (!isLoggingOut) { // Check if the user is not logging out
    console.log(`User is signed out`);
    alert(`Please login first then you can add a post`);
    window.location = `../login.html`;
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
        loginBtn.innerHTML = `<p class="text-white text-[0.7rem] sm:text-[1rem]">${doc.data().firstname} ${doc.data().lastname}</p> <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                      <img alt="Tailwind CSS Navbar component"
                          src="${doc.data().userimage}"/>
                  </div>
              </div>
              <ul tabindex="0"
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                      <a class="justify-between" href="./index.html">
                          Home
                          <span class="badge">New</span>
                      </a>
                  </li>
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
    isLoggingOut = true; // Set the flag to true when logging out
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


// Trigger file input when product image is clicked
productimage.addEventListener('click', function () {
  document.getElementById('fileInput').click();
});

let file; // Variable to store the selected file

let fileInput = document.getElementById('fileInput'); // Select the file input element
fileInput.addEventListener('change', function (event) {
  file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector('#productimage img').src = e.target.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }
});

// Function to upload the image to Firebase Storage and get the download URL
async function showUrl(file) {
  const storageRef = ref(storage, ownername.value); // Reference to the storage location using the owner's name

  try {
    const uploadimage = await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}

// Event listener for the form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  addBtn.disabled = true
  addBtn.innerHTML = `<img class="loading" src="./image/loading.gif" alt="no img">`; // Display loading icon
  let ownernumberRegex = /^0\d{10}$/;



  // Function to format the phone number to start with +92
  function replaceFirstDigitWithCode(number) {
    let numberStr = number.toString();
    if (numberStr.startsWith("+92")) {
      return numberStr;
    }
    let modifiedOwnerNumber = "+92" + numberStr.slice(1);
    return modifiedOwnerNumber;
  }
  let modifiedOwnerNumber = replaceFirstDigitWithCode(ownernumber.value);
  console.log(modifiedOwnerNumber);

  let userimageurl = await showUrl(file); // Upload the image and get the URL
  console.log(userimageurl);

  adddata(); // Call the function to add the product data to Firestore

  // Function to add product data to Firestore
  async function adddata() {
    // Check if all input fields are filled
    if (
      productTitle.value === `` ||
      ProductionDescription.value === `` ||
      productdprice.value === `` ||
      ownername.value === `` ||
      ownernumber.value === `` ||
      !ownernumberRegex.test(ownernumber.value) ||
      !file
    ) {
      alert(`fill the all inputs and check your Net connection`)
      addBtn.disabled = false

    } else {
      try {
        const docRef = await addDoc(collection(db, "userproducts"), {
          ownername: ownername.value,
          ownernumber: modifiedOwnerNumber,
          productTitle: productTitle.value,
          ProductionDescription: ProductionDescription.value,
          productdprice: productdprice.value,
          productdimage: userimageurl,
          usersDataArray
        });

        Swal.fire({
          title: 'Success!',
          text: 'Your product is added',
          icon: 'success',
          confirmButtonText: 'added'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Document written with ID: ", docRef.id);
          }
          // Reset form fields
          ownername.value = "";
          ownernumber.value = "";
          productTitle.value = "";
          ProductionDescription.value = "";
          productdprice.value = "";
          file = ``
          document.querySelector('#productimage img').src = "./image/Plus_rectangle.png"; // Reset the product image
          addBtn.disabled = false
        });

      } catch (e) {
        addBtn.innerHTML = `AD Post`;
        console.log("Error adding document: ", e);
        Swal.fire({
          title: 'Error!',
          text: e,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    }


    addBtn.innerHTML = `AD Post`; // Reset the add button text
  }


});
