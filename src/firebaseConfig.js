import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBin9gkJBodI-oJS4sH1kIesyIy8Xn-B2U",
    authDomain: "monster-hunt-v1.firebaseapp.com",
    projectId: "monster-hunt-v1",
    storageBucket: "monster-hunt-v1.appspot.com",
    messagingSenderId: "5712090032",
    appId: "1:5712090032:web:cf39258621713586d7bc75"
  };

  const firestoreDatabase = firebase.initializeApp(firebaseConfig).firestore();

  export default firestoreDatabase;


