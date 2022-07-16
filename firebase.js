import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, deleteDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage, deleteObject } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyD-emfrFSphjqf6WipZNCUs3Br6cX5Jg8Q",
    authDomain: "larguezlesamarres-a1817.firebaseapp.com",
    databaseURL: "https://larguezlesamarres-a1817-default-rtdb.firebaseio.com",
    projectId: "larguezlesamarres-a1817",
    storageBucket: "larguezlesamarres-a1817.appspot.com",
    messagingSenderId: "907895696510",
    appId: "1:907895696510:web:769041d46012e5884e7c2f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)

export {db, auth, storage, setDoc, doc, deleteDoc, deleteObject};