import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { useCart } from "./CartContext";
import firebase from "firebase";

export const SellButton = () => {
  const user = useUser();
  const { getSellCartItems, resetSellCart, getTotalSellPrice } = useCart();

  const updateUserArmory = async () => {
    const collectionRef = db
      .collection("users")
      .doc(user.uid)
      .collection("armory");

    getSellCartItems().forEach((item) => {
      console.log(item.id);
      const id = item.id;
      collectionRef.doc(id).delete();
    });
  };

  const updateUserGold = () => {
    db.collection("users")
      .doc(user?.uid)
      .update({
        resources: {
          gold: user?.resources.gold + getTotalSellPrice(),
        },
      });
  };

  return (
    <div>
      <button
        className="btn btn-green"
        onClick={() => {
          updateUserArmory();
          resetSellCart();
          updateUserGold();
        }}
      >
        Sprzedaj
      </button>
    </div>
  );
};
