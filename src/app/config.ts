// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getAuth,GithubAuthProvider,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_API_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  };
  


const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const gitprovider=new GithubAuthProvider()
export {auth,provider,db,gitprovider}