import { auth } from "../firebaseConfig"

function onAuthStateChange() {
    return auth.onAuthStateChanged(user => {
      if (user) {
        console.log("The user is logged in");
      } else {
        console.log("The user is not logged in");
      }
    });
  }
  onAuthStateChange();