// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import  "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4LwszMo9qwV-Q7odokLCaGCsxQ2x_POw",
  authDomain: "image-uploads-6e4c3.firebaseapp.com",
  projectId: "image-uploads-6e4c3",
  storageBucket: "image-uploads-6e4c3.appspot.com",
  messagingSenderId: "223841863390",
  appId: "1:223841863390:web:6d9a42a1ba687ad78c244f",
  measurementId: "G-QQ94LV14WQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}