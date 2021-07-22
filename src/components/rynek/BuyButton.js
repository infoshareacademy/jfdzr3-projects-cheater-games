import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export function BuyButton({resetCart}) {
  const user = useUser();

  const updateUserArmory = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("armory")
      .doc("getFromStore")
      .update({});
  };
  return (
    <div>
      <button className="btn btn-green" onClick={() => {
        //   updateUserArmory()
          resetCart()
      }}>
        Kup
      </button>
    </div>
  );
}
