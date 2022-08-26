// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuCFBPwuYrs3ito1FYTKuZ98Bv9HOys88",
  authDomain: "react-cursos-a9ff2.firebaseapp.com",
  projectId: "react-cursos-a9ff2",
  storageBucket: "react-cursos-a9ff2.appspot.com",
  messagingSenderId: "522871784473",
  appId: "1:522871784473:web:595d9683b331984b64d688"
};

// Initialize Firebase
export const FirebaseApp    = initializeApp(firebaseConfig);
export const FirebaseAuth   = getAuth( FirebaseApp );
export const FirebaseDB     = getFirestore( FirebaseApp );