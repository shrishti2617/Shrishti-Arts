// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEm13SWGAKTyDmzzmvDhjh76KjEGpkCEY",
  authDomain: "shrishti-arts.firebaseapp.com",
  projectId: "shrishti-arts",
  storageBucket: "shrishti-arts.firebasestorage.app",
  messagingSenderId: "887372938083",
  appId: "1:887372938083:web:edd5f013995da3b205f156",
  measurementId: "G-468CZLW6MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);