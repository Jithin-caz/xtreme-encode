// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8Yx1ICtFhwjetqB7sBO8rURGEhPlZzeE",
  authDomain: "tensile-axon-373718.firebaseapp.com",
  projectId: "tensile-axon-373718",
  storageBucket: "tensile-axon-373718.appspot.com",
  messagingSenderId: "609997090509",
  appId: "1:609997090509:web:d573ccb0d2cc6c90684384",
  measurementId: "G-P01LKLCCZ5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const gitprovider = new GithubAuthProvider();
export { auth, provider, db, gitprovider };
