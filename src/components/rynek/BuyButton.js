import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export function BuyButton({ resetCart, updatedUserItems, totalPrice, userArmoryBeforeBuy }) {
  const user = useUser();

  // const dataArray = [];
  // const getItemsFromCart = updatedUserItems.map((el) => {
  //         const key = el.key;
  //         const val = el.val;
  //         const type = el.type;
  //         const itemObject = {[`${key}`]: {...val, type, id: Date.now()}}

  //         dataArray.push(itemObject)
  //     })

  //     const convertDataArrayToObject = {...dataArray}

  const updateUserArmory = async () => {
    const docRef = db
      .collection("users")
      .doc(user.uid)
      .collection("armory")
      .doc("getFromStore");
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("dokument istniej");
      // docRef.update({
      //    [key]: {
      //         gold: 1000
      //     }
      // })
      const getItemsFromCart = updatedUserItems.map((el) => {
        const key = el.key;
        const val = el.val;
        const type = el.type;
        const itemObject = { [`${key}`]: { ...val, type, id: Date.now() } };

        docRef.update(itemObject);
      });

      // docRef.update(...userArmoryBeforeBuy);

    } else {
      console.log("dokument nie istnieje");
    }
  };

  const updateUserGold = () => {
    db.collection("users")
      .doc(user?.uid)
      .update({
        resources: {
          gold: user?.resources.gold - totalPrice,
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
}
