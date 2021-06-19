import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBin9gkJBodI-oJS4sH1kIesyIy8Xn-B2U",
  authDomain: "monster-hunt-v1.firebaseapp.com",
  projectId: "monster-hunt-v1",
  storageBucket: "monster-hunt-v1.appspot.com",
  messagingSenderId: "5712090032",
  appId: "1:5712090032:web:cf39258621713586d7bc75",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebaseApp.auth();
export default firebaseApp;
