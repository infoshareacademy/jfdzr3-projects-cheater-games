import firebaseApp, { auth } from "../firebaseConfig";
import {useState, useEffect} from "react";



const useFirebaseAuthentication = (firebase) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() =>{
       const unlisten = auth.onAuthStateChanged(
          authUser => {
            authUser
              ? setAuthUser(authUser)
              : setAuthUser(null);
          },
       );
       return () => {
           unlisten();
       }
    });
    // console.log(authUser.uid);
    return authUser
}

export default useFirebaseAuthentication;

