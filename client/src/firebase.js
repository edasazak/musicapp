// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCdPmdvb-nUzYOeNpdhkljYSj8_uKOzp2c",
  authDomain: "login-6a7fa.firebaseapp.com",
  projectId: "login-6a7fa",
  storageBucket: "login-6a7fa.appspot.com",
  messagingSenderId: "546420769278",
  appId: "1:546420769278:web:260d646595b06ab0cc00af"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;