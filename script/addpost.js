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
import { storage, auth, db } from "../config.js";
let uid;

// JavaScript to handle the click event
let productimage = document.querySelector('#productimage')
let form = document.querySelector(`#form`);
let productTitle = document.querySelector(`#productTitle`);
let ProductionDescription = document.querySelector(`#ProductionDescription`);
let productdprice = document.querySelector(`#price`);
let ownername = document.querySelector(`#yourName`);
let ownernumber = document.querySelector(`#yourNumber`);
let logoutButton = document.querySelector(`#button`);
let addBtn = document.querySelector(`#addBtn`);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    console.log(uid);

  } else {
    console.log(`User is signed out`);
    window.location = `../login.html`;
    // User is signed out
    // ...
  }
});


logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log(`Sign-out successful.`);
    window.location = `../login.html`;
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
});




productimage.addEventListener('click', function () {
  document.getElementById('fileInput').click(); // Trigger the file input click
});

let file

// Optional: Handle file selection
let fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', function (event) {
  file = event.target.files[0];
  if (file) {
    // Display the selected image (optional)
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector('#productimage img').src = e.target.result;
    };
    reader.readAsDataURL(file);
    console.log(file);

  }
});

async function showUrl(file) {
  const storageRef = ref(storage, ownername.value);

  try {
    const uplordimage = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url

  } catch (error) {
    console.log(error);

  }

}
// let allproducts = []
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  addBtn.innerHTML = `<img class="loading" src="./image/loading.gif" alt="no img">`

  if (
    productTitle.value === `` || 
    ProductionDescription.value === `` || 
    productdprice.value === `` || 
    ownername.value === `` || 
    ownernumber.value === `` || 
    !file
  ) {
    alert(`please reload your page because you did not fill these input fields`);
    return; // Prevent further execution if validation fails
  } 
  function replaceFirstDigitWithCode(number) {
    // Convert the number to a string
    let numberStr = number.toString();
    // Check if the number already starts with '+92'
    if (numberStr.startsWith("+92")) {
      return numberStr; // No need to change anything
    }
    // Replace the first digit with '+92'
    let modifiedOwnerNumber = "+92" + numberStr.slice(1);
    return modifiedOwnerNumber;
  }
  // Example usage:
   ownernumber.value // Replace with any number
  let modifiedOwnerNumber = replaceFirstDigitWithCode(ownernumber.value);
  console.log(modifiedOwnerNumber); // Output will be '+923012345678'
  
console.log(productTitle.value);
console.log(ProductionDescription.value);
console.log(productdprice.value);
console.log(ownername.value);
console.log(ownernumber.value);
console.log(modifiedOwnerNumber);
let userimageurl = await showUrl(file)
console.log(userimageurl);
adddata()


async function adddata() {

  try {
    const docRef = await addDoc(collection(db, "userproducts"), {
      ownername: ownername.value,
      ownernumber: ownernumber.value,
      productTitle: productTitle.value,
      ProductionDescription: ProductionDescription.value,
      productdprice: productdprice.value,
      productdimage: userimageurl

    });
    Swal.fire({
      title: 'Success!',
      text: 'Your product is added',
      icon: 'success',
      confirmButtonText: 'added'
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("Document written with ID: ", docRef.id);
        }
      });


  } catch (e) {
    console.log("Error adding document: ", e);
    Swal.fire({
      title: 'Error!',
      text: e,
      icon: 'error',  
      confirmButtonText: 'Try Again'
    });
  }
  addBtn.innerHTML = `AD Post`
}


ownername.value = ""
ownernumber.value = ""
productTitle.value = ""
ProductionDescription.value = ""
productdprice.value = ""
file = ""
document.querySelector('#productimage').src = '../image/Plus_rectangle.png"';

})
