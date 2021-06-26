import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

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
            photo: item.data().photo,
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
 
  if (items === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
        {items.map((item) => (
          
            <div
              key={item.id}
              style={{
                border: "1px solid lightgrey",
              }}
            >
              <h2>{item.name}</h2>
              <h4>
                <img src={item.photo} style={{ width: "100%", border: "2px solid #e1984d", borderRadius: "10%"  }} />
              </h4>
              <h4>{item.bonus1}</h4>
              <h4>{item.bonus2}</h4>
              <h4>{item.bonus3}</h4>
            </div>
        ))}
    </>
  );
};
