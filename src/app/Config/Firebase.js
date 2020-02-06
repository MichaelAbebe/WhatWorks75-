import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPkHYahOb1DnE3fI-xbfK7_egXDxDa1UA",
  authDomain: "whatworks-a599c.firebaseapp.com",
  databaseURL: "https://whatworks-a599c.firebaseio.com",
  projectId: "whatworks-a599c",
  storageBucket: "whatworks-a599c.appspot.com",
  messagingSenderId: "627556074160",
  appId: "1:627556074160:web:f0b8cd69441c8e4dd3b175",
  measurementId: "G-T6MHJG2XQH"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
