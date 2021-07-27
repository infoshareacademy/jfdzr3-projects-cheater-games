import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { useCart } from "./CartContext";
import firebase from "firebase";

export const BuyButton = () => {
  const user = useUser();
  const { getCartItems, resetCart, getTotalPrice } = useCart();

  const updateUserArmory = async () => {
    const collectionRef = db
      .collection("users")
      .doc(user.uid)
      .collection("armory");

    getCartItems().forEach((item) => {
      console.log(item);
      collectionRef.add({
        obtainedAt: firebase.firestore.FieldValue.serverTimestamp(),
        prefix: "",
        suffix: "",
        name: item.key,
        type: item.type,
        quality: 1,
      });
    });
  };

  const updateUserGold = () => {
    db.collection("users")
      .doc(user?.uid)
      .update({
        resources: {
          gold: user?.resources.gold - getTotalPrice(),
        },
      });
  };

  return (
    <div>
      <button
        className="btn btn-green"
        onClick={() => {
          updateUserArmory();
          resetCart();
          updateUserGold();
        }}
      >
        Kup
      </button>
    </div>
  );
};
