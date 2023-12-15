// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGaesX384FFewd1XrUMUsDRsm7XhipDrc",
  authDomain: "authangular-0602.firebaseapp.com",
  databaseURL: "https://authangular-0602-default-rtdb.firebaseio.com",
  projectId: "authangular-0602",
  storageBucket: "authangular-0602.appspot.com",
  messagingSenderId: "220232631904",
  appId: "1:220232631904:web:f64c15b1e80396cb846505",
  measurementId: "G-JRD2Q6EFFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);