// import { db } from "../../firebaseConfig";
// import { useItems } from "../../hooks/useItems";
// import { useUserItems } from "../../hooks/useUserItems";



// import { useUser } from "../../hooks/useUser";
import styled from 'styled-components'

const ItemStyle = styled.div`
height: max-content;
// border: 1px solid gray;
// white-space: nowrap;
padding: 0 5px;
min-width: 60px;
min-height: 50px;
`

export const Items = ({ items }) => {
  console.log(items);

  // const user = useUser();
  // const itemsRef = db.collection('items');
  // const userItemsRef = db.collection('users').doc(user?.uid).collection('armory');
  // const items = useItems(itemsRef);
  // const userItems = useUserItems(userItemsRef)
  // console.log(items);
  // console.log(userItems);

  if (items.length === 0) {
    return <p>Loading</p>;
  } else {
    return (
      <>
        {items &&
          items.map((item, index) => (
            <ItemStyle key={index}>
              <h5>{item.key}</h5>
              <h6 style={{marginTop: "5px"}}>gold: {item.val.value}</h6>
            </ItemStyle>
          ))}
      </>
    );
  }
};
