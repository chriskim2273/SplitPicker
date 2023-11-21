// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6Y5InfX5TJhUYKzAX5U0RwWvZggl60qw",
    authDomain: "splitpicker-c6bf8.firebaseapp.com",
    projectId: "splitpicker-c6bf8",
    storageBucket: "splitpicker-c6bf8.appspot.com",
    messagingSenderId: "982572975395",
    appId: "1:982572975395:web:e821494cf7cfd2bdf8f896",
    measurementId: "G-BHS21VK8GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);