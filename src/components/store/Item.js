import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

const Test = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
    .onSnapshot((items) => {
      setItems(items.docs.map((doc) => doc.data()));
    });
  }, []);
  console.log(items.Kosa);
  return items;
};

export const useItemsId = () => {
  const [itemsId, setItemsId] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      setItemsId(snapshot.docs.map((doc) => doc.data()));

      console.log(snapshot.docs.map((doc) => doc.data()));
    });
    // db.collection("items")
    // .onSnapshot((snapshot) => {
    //   const data = snapshot.docs.map((doc) => ({
    //     id: doc.id
    //   }));
    //   console.log("All data in 'books' collection", data);
    // });
    //  })
  }, []);
  return itemsId;
};

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [itemsId, setItemsId] = useState([]);

  useEffect(() => {
    db.collection("items")
      .doc("handWeapon")
      .onSnapshot((doc) => {
        // const newItems = snapshot.docs.map((doc) => {
        setItems({ ...doc.data() });
        setItemsId({ id: doc.id });
        console.log(doc.data());
        const data = doc.data();
        console.log(data);
        //  for (const property in data) {
        //     console.log(property, data[property])
        //  }
      });
    //  })
  }, []);
  return items;
};

export const useItems2 = () => {
  const [items2, setItems2] = useState([]);
  const [itemsId, setItemsId] = useState([]);

  useEffect(() => {
    db.collection("items")
      //  .doc("handWeapon")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          const newItems = doc.data();
          // setItems2 ({ ...doc.data() });
          // setItems2 (doc.docs.map(d => [...d.data()]))
          const keyArr = [];
          const itemsArr = [];
          console.log(newItems);
          for (const property in newItems) {
            console.log(property, newItems[property]);
            itemsArr.push(`key: ${property}`);

            itemsArr.push(newItems[property]);
        //     setItems2([property, newItems[property]]);
        //   }
        setItems2({key: property, val: newItems[property]});
    }
    
          
          console.log(itemsArr);
          console.log(keyArr);

          return newItems;
          setItemsId({ id: doc.id });
        });
      });
  }, []);
  return items2;
};

export const Item = () => {
  const test = Test();

  console.log(test);
  console.log(test.miecz);
  console.log(test.Miecz);

  const itemsId = useItemsId();
  console.log(itemsId);
  //-----
  const valArr = [];

  const isObject = (val) => {
    if (val === null) {
      return false;
    }
    return typeof val === "object";
  };
// const objProps = (obj) => {
//     for (let val in obj) {
//         if (isObject(obj[val])) {
//               objProps(obj[val])
//         } else {
//           console.log(val, obj[val]);
//         }
//       }
// }
// objProps(itemsId);
// console.log(objProps(itemsId));
// const [testItems, setTestitems] = useState([])
const cosArr = []
  for (let val in itemsId) {
    if (isObject(itemsId[val])) {
      for (let key in itemsId[val]) {
        console.log("key:" + key, itemsId[val][key]);
        valArr.push([key, itemsId[val][key]]);
        const cos = itemsId[val][key]
        const cos2 = {key}
        const cos3 = {...cos, ...cos2}
        console.log(cos3);
        console.log(cos2);
        cosArr.push(cos)
        console.log(cos);
        console.log(cosArr);
      }
    } else {
      console.log(val, itemsId[val]);
    }
  }
  console.log(valArr);
// return testItems
  //-----

  console.log(Object.values(itemsId));
  // for (const [key, value] in itemsId){
  //     console.log(key, value);
  // }
  for (const property in itemsId) {
    console.log(property, itemsId[property]);
  }

  console.log([].concat(...itemsId));
  console.log(itemsId.flat());
  const flatArr = itemsId.reduce((acc, curr) => acc.concat(curr), []);
  console.log(flatArr);
  const flat = Object.values(itemsId).map((k) => {
    console.log(k);
  });
  console.log(itemsId);

  const items = useItems();
  console.log(items);
  const items2 = useItems2();
  console.log(items2);
  console.log(items2.key);
  console.log(items2.val);



  const propertyArr = [];
  for (const property in items) {
    console.log(`${property}: ${items[property]}`);
    console.log(property, items[property]);
    propertyArr.push([property, items[property]]);
  }
  console.log(propertyArr);
  //   for (const property in items2) {
  //     console.log(`${property}: ${items2[property]}`);
  //     console.log(property, items2[property]);

  //   }
  const keysArr = [];
  console.log(Object.keys(items).map((k) => k));
  console.log(Object.keys(itemsId));
  console.log(Object.keys(items2));

  const tablicaKluczy = ["kosa", "miecz", "Kosa", "Miecz", "test"];
  const keys = Object.keys(items);
  keys.map((k) => {
    keysArr.push(k);
    console.log(k);
  });
  console.log(keysArr);
  console.log(
    keys
      .map((k) => {
        console.log(k);
      })
      .flat({})
  );
  tablicaKluczy.map((klucz) => {
    console.log(klucz);
    return klucz;
  });
  propertyArr.map((el) => {
    console.log(el);
  });
  return (
    <>
      <span>hello</span>
      <ul>
        {propertyArr &&
          propertyArr.forEach((klucz) => {
            {
              /* <li>{klucz}</li> */
            }
            <p>{klucz}</p>;
          })}
        {/* {keys.map((k) => {
         
     
        <li key={Object.keys(items).map(k => k)}>
        {Object.keys(items).map(k => k)}
        </li>
          })} */}

        <span>hello2</span>
      </ul>
    </>
  );

  //     const user = useUser();
  //     const [items, setItems] = useState([]);
  //     const [keys, setKeys] = useState([])

  // // const readId = async (collection, ids) => {
  // //     const reads = ids.map(id => collection.doc(id).get() );
  // //     const result = await Promise.all(reads);
  // //     console.log(result.map(v => v.data()));
  // //     return result.map(v => v.data() );
  // // }

  //     useEffect(() => {
  //         if (user?.uid === null) {
  //             setItems(null);
  //             return;
  //         }

  //         return  db.collection("items").doc("heandWeapon")
  //         .onSnapshot((doc) => {
  // //                   const testarr = [];
  //       if (doc.exists) {

  //                 const data = doc.data()
  //                  setItems({ id: doc.id, ...doc.data
  //                 () })
  //                 console.log(items);
  // //                 console.log(data);
  // //                 console.log(data.stages.key);

  // //                 console.log(doc.id);
  // //                 console.log(doc.keys);
  //                 console.log(doc.data());
  // //                 console.log(doc.data().target);
  // //                 console.log(doc.data().source);

  //                  }

  // //                const testkey=  Object.keys(data).map((k) => {
  // //                     console.log(`key: ${k}`);
  // //                     console.log(k, data[k]);
  // //                     return k
  //                 //   });
  // //                   testarr.push({id: doc.id,key: testkey, ...doc.data() })
  // //                 console.log(Object.keys(data));
  // //                 // setItems({ id: doc.id, key: testkey, ...doc.data
  // //                 // () })
  // //                 setItems([ ...testarr ])
  // //                 setKeys({ key: Object.keys(data)})
  // //                 console.log(testarr);
  // return items
  // //                 return testarr
  //               })
  //               }, []);
  // console.log(items);

  // //               console.log(items);
  // //               console.table(items);

  // //               console.log(items.key);

  // //               console.log(keys);

  // //       console.log(user);

  // //     //   if (testarr === null) {
  // //     //     return <p>Loading...</p>;
  // //     //   }
  // //     return (

  // //     <>
  // //     {items && items.map((weapon) => (
  // //       <div
  // //         key={weapon.id}
  // //         style={{
  // //           border: "1px solid lightgrey",
  // //         }}
  // //       >

  // //         <h2>{weapon.key.forEach((k)=>k)}</h2>
  // //         <div>{weapon.id}</div>
  // //         <div>{weapon.key}</div>
  // //         <div>{weapon.def}</div>
  // //         <div>{weapon.value}</div>

  // //         <h4>
  // //           <img
  // //             src={weapon.photo}
  // //             alt={weapon.name}
  // //             style={{
  // //               width: "100%",
  // //               border: "2px solid #e1984d",
  // //               borderRadius: "10%",
  // //             }}
  // //           />
  // //         </h4>
  // //         <h4>{weapon.bonus1}</h4>
  // //         <h4>{weapon.bonus2}</h4>
  // //         <h4>{weapon.bonus3}</h4>
  // //       </div>
  // //     ))}
  // //   </>
  // //     )
  return null;
};
