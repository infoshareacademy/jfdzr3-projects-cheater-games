// import { db } from "../../firebaseConfig";
// import { useItems } from "../../hooks/useItems";
// import { useUserItems } from "../../hooks/useUserItems";
import { useUser } from "../../hooks/useUser";

export const Items = ({ items }) => {
  console.log(items);
  
  // const user = useUser();
  // const itemsRef = db.collection('items');
  // const userItemsRef = db.collection('users').doc(user?.uid).collection('armory');
  // const items = useItems(itemsRef);
  // const userItems = useUserItems(userItemsRef)
  // console.log(items);
  // console.log(userItems);


  if(items.length === 0) {
    return (
      <p>Loading</p>
    )
  }else {

    return (
      <>
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <h5>{item.key}</h5>
              <h6>gold: {item.val.value}</h6>
            </div>
          ))}
      </>
    );
  }
};
