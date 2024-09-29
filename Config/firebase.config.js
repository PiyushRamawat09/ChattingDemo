import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAUhhFfMqQ_sYxBCC_Qsc9lAMhVVtsJIE",
  authDomain: "chattingdemo-1882e.firebaseapp.com",
  databaseURL: "https://chattingdemo-1882e-default-rtdb.firebaseio.com",
  projectId: "chattingdemo-1882e",
  storageBucket: "chattingdemo-1882e.appspot.com",
  messagingSenderId: "345391786751",
  appId: "1:345391786751:web:8373d1eb069d91a25afaca"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const fireStoreDB = getFirestore(app);

export  {app, firebaseAuth, fireStoreDB}

