import { db } from "../firebaseConfig";

export function BuyButton() {

    const updateUserArmory = () => {
        db.collection('users').doc(user.uid).collection("armory").doc("getFromStore").update({
            
        })
    }
    return (
      <button className="btn btn-green" onClick={updateUserArmory}>
        Kup
      </button>
    );
  }