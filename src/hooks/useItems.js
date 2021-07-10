import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useUser } from "./useUser";

export const useItems = ({ref}) => {
    const user = useUser();
    const [items, setItems] = useState([]);
    console.log(user);
    useEffect(() => {
          if (user){
        ref.onSnapshot((snapshot) => {
          const newItems = [];
          snapshot.docs.map((doc) => {
            for (const property in doc.data()) {
              newItems.push({
                type: doc.id,
                key: property,
                val: doc.data()[property],
              });
            }
            return newItems;
          });
          setItems(newItems);
        });
    }
      }, []);
      return items;
    };


// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";

// export const useItems = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     db.collection("items").onSnapshot((snapshot) => {
//       const newItems = [];
//       snapshot.docs.map((doc) => {
//         for (const property in doc.data()) {
//           newItems.push({
//             type: doc.id,
//             key: property,
//             val: doc.data()[property],
//           });
//         }
//         return newItems;
//       });
//       setItems(newItems);
//     });
//   }, []);
//   return items;
// };