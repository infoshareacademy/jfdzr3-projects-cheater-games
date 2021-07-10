import { db } from "../../firebaseConfig";
import { useItems } from "../../hooks/useItems";
import { Items } from "./Items";
import "./store.css";
import { TextBlock } from "./TextBlok";

// export const ItemsGrid = ({ text, children }) => (
//   <div className="items-wrapper wrapper">
//     <TextBlock>{text}</TextBlock>
//     <div className="items-grid">{children}</div>
//   </div>
// );


export const ItemsGrid = ({ text,ref, children }) => {
  const itemsRef = db.collection('items');
  // const userItemsRef = db.collection('users').doc(user?.uid).collection('armory');
  const items = useItems(itemsRef);
  // const userItems = useItems(userItemsRef);
  console.log(items);
  console.log(items);


  return (
  <div className="items-wrapper">
    <TextBlock>{text}</TextBlock>
    {/* <div className="items-grid">{children}</div> */}
    <Items ref={ref}/>
    {/* {children} */}
  </div>
);
  }