import { useEffect, useState } from "react";
import firebase from "firebase/app";


export const useUser = () => {
    const [document, setDocument] = useState(null);
    const user = firebase.auth().currentUser;
    useEffect(() => {
      if (user === null) {
        return;
      }
        const db = firebase.firestore();
        return db
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            setDocument(doc.data());
          });
    }, [user]);
    return document;
  };