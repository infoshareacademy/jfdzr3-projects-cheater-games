import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      const newItems = [];
      snapshot.docs.map((doc) => {
        for (const property in doc.data()) {
          // console.log({id: doc.id,key: property, val: doc.data()[property]});
          newItems.push({
            id: doc.id,
            key: property,
            val: doc.data()[property],
          });
          // setItems({id: doc.id,key: property, val: doc.data()[property]});
        }

        return newItems;
      });
      console.log(newItems);
      setItems(newItems);
    });
  }, []);
  return items;
};

export const Test = () => {
  const items = useItems();
  console.log(items);
  items.map((item) => {
    console.log(item.key);
  });
  items.map((item) => {
    console.log(item.val);
  });
  items.map((item) => {
    console.log(item.val.value);
  });
  items.map((item) => {
    console.log(item.val.vit);
  });

  items.map((item) => {
    console.log(item.id);
  });

  if (items === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="item-list">
        <h2>For Sale</h2>
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <p>{item.key}</p>
            </div>
          ))}
      </div>
    </>
  );
};

// export const Test = () => {

//     const [items, setItems] = useState([])

//     const isObject = (val) => {
//         if (val === null) {
//           return false;
//         }
//         return typeof val === "object";
//       };

//     useEffect(()=> {
//         db.collection('items').onSnapshot((snapshot)=> {
//             const newItems = snapshot.docs.map((doc)=>{
//                 for (let property in doc.data()) {
//                     console.log(doc.data()[property]);
//                     console.log(property);
//                     if (isObject(doc.data()[property])){

//                     setItems({id: doc.id,key: property, val: doc.data()[property]});
//                 }
//             }
//             })
//             return newItems
//         })
//     },[])

//     if (items !== null){

//         console.log(items);
//         console.log(items.key);
//         console.log(items.val);
//         console.log(items.id);

//         // console.log(items.val.value);
//         // console.log(items.val.vit);
//     }

//     return null
// }
