import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(setToken);
  }, []);

  useEffect(() => {
    if (token === null) {
      setUser(null);
      return;
    }
    return db.collection("users").doc(token.uid).onSnapshot((doc) => {
        setUser({ uid: token.uid, ...doc.data() });
      });
  }, [token]);

  return user;
};
