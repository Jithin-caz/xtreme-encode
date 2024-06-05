// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getAuth,GithubAuthProvider,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCf0K3lB5agFceJUrMkMcE_AdpMZYhSGWc",
    authDomain: "xtreme-encode.firebaseapp.com",
    projectId: "xtreme-encode",
    storageBucket: "xtreme-encode.appspot.com",
    messagingSenderId: "281493172195",
    appId: "1:281493172195:web:0452f21965395dfdd1bad6",
    measurementId: "G-EZT4HS0LQN"
  };
  


const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const gitprovider=new GithubAuthProvider()
export {auth,provider,db,gitprovider}