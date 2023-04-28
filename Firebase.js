import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from  "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-GKoaha7JNvrtarWQtpUGyQ0ADTX5Qpw",
  authDomain: "laundaryapp-1edac.firebaseapp.com",
  projectId: "laundaryapp-1edac",
  storageBucket: "laundaryapp-1edac.appspot.com",
  messagingSenderId: "1013991098643",
  appId: "1:1013991098643:web:5b905c4eaf87154c4672e6"
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const db = getFirestore();

export {auth,db};