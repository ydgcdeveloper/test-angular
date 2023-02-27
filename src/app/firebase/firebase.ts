// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiBptLofn22vJWpgn2lfD22R4qM1XiVl0",
    authDomain: "angular-test-88757.firebaseapp.com",
    databaseURL: "https://angular-test-88757-default-rtdb.firebaseio.com",
    projectId: "angular-test-88757",
    storageBucket: "angular-test-88757.appspot.com",
    messagingSenderId: "1000793685429",
    appId: "1:1000793685429:web:9a00ec1b0f764f40a56dfc"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
