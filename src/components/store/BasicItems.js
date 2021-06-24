import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ItemGrid } from "./ItemGrid";
import { ItemTile } from "./ItemTile";

export const BasicItems = () => {
  const fetchItems = async () => {
    return db
      .collection("testItems")
      .get()
      .then((querySnapshot) => {
        const items = querySnapshot.docs.map((item) => {
          return {
            name: item.data().nazwa,
            bonus1: item.data().bonus1,
            bonus2: item.data().bonus2,
            bonus3: item.data().bonus3,
            id: item.id,
          };
        });
        return items;
      });
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems().then((itemsFromDB) => {
      setItems(itemsFromDB);
    });
  }, []);
  console.log(items);
  if (items === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ItemGrid>
  
        {items.map((item) => (
           <ul key={item.id} style=
          {{
            border: "1px solid lightgrey"
          }}>
            <li>{item.name}</li>
            <li>{item.bonus1}</li>
            <li>{item.bonus2}</li>
            <li>{item.bonus3}</li>
          </ul> 
        ))} 
        </ItemGrid>
      </>
  );
};
