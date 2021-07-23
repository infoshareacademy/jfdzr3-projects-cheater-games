import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export function BuyButton({ resetCart, updatedUserItems, totalPrice }) {
  const user = useUser();
console.log(updatedUserItems);
let {key} = updatedUserItems.map((el) => el.key);
let {val} = updatedUserItems.map((el) => el.val);
console.log(key);
const userUpdate = {};
userUpdate[`${key}.val`] = true;
  const updateUserArmory = async () => {
    const docRef = db
      .collection("users")
      .doc(user.uid)
      .collection("armory")
      .doc("getFromStore");
    const doc = await docRef.get();
    if (doc.exists) {
        console.log("dokument istniej");
        // docRef.update(userUpdate)
    //   docRef.update({ key: key, val: val });
    // docRef.update(
        
    //     {key=key {
    //     val=val {}}}
    //     );
    } else {
        console.log("dokument nie istnieje");
        // docRef.set({key: updatedUserItems.key, val: updatedUserItems.val});
        // docRef.set(
            
        //     {key:  {
        //         val: {}}}
        // );
        // docRef.set( { key: key, val: val }) 
        // docRef.set(userUpdate)

    }
  };

  const updateUserGold = () => {
      db.collection("users").doc(user?.uid).update({
          resources: {
               gold: user?.resources.gold - totalPrice}
      })
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
}
