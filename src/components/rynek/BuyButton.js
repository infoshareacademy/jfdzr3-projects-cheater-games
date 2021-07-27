import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export function BuyButton({
  resetCart,
  updatedUserItems,
  totalPrice,
  userArmoryBeforeBuy,
}) {
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

  const getItemsFromCart = () =>
    updatedUserItems.flatMap((el) => {
      const key = el.key;
      const val = el.val;
      const type = el.type;
      const itemObject = { key, val, type };

      return Array.from({ length: el.orderCount }).fill(itemObject);
    });

  const updateUserArmory = async () => {
    const collectionRef = db
      .collection("users")
      .doc(user.uid)
      .collection("armory");

    getItemsFromCart().forEach((item) => {
      console.log(item);
      collectionRef.add(item);
    });
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
