import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

// const refItems = {
//   userItems: db.collection("users").doc(uid).collection("armory"),

// };

export const BasicItems = () => {
  const uid = auth.currentUser.uid;
  //---- Działą dla konkretnego elementu

  // var docRef = db.collection("items").doc("handWeapon");

  // docRef.get().then((doc) => {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //         const items = doc.data()
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch((error) => {
  //     console.log("Error getting document:", error);
  // });
  //-------

  //   db.collection("items")
  //     .get()
  //     .then((querySnapshot) => {
  //       const itemsDoc = querySnapshot.docs.map((doc) => {
  // const data = doc.data();
  // const objectKey =  Object.keys(data).map((k) => {
  //   console.log(`key: ${k}`);
  //   console.log(k, data[k]);
  //   return k
  // });
  // const objectData =  Object.keys(data).map((k) => {
  //   console.log(data[k]);
  //   return data[k]
  // });
  // console.log(objectData);
  // console.log(objectKey);
  //         console.log(objectKey.map((el)=>el));
  //         console.table(doc.data());
  //         console.log(doc.data());

  //         console.log(doc.data().kosa);

  //         const test2 = doc.data();
  //         // const test3 = Object.entries(test2);
  //         // console.log(Object.entries(test2));
  //         // console.table(Object.values(test2));
  //         // console.log(test3);
  //         // console.log(test3.map((el) => el.map((e) => e)));
  //         // console.table(test3);
  //         // for (const [key, value] of test3) {
  //         //   console.log(`key: ${key}
  //         //   value: ${{ value }}
  //         //   entry: { ${key}: ${value} }`);
  //         // }
  //           Object.keys(test2).map((k) => {
  //             console.log(`key: ${k}`);
  //             console.log(k, test2[k]);
  //           });
  //         return {
  //           typeId: doc.id,
  //           name: Object.keys(data).map((k) => {return k }),
  //         }
  //       });
  //       console.log(itemsDoc);
  //       console.table(itemsDoc);

  //       // console.log(Object.entries(test));
  //       // const test2 = Object.entries(test);
  //       // test2.map((el) => console.table(...el))
  //       // test2.map((el, index) => console.log(el, index))
  //     });

  //---
  var docRef = db.collection("items").doc("handWeapon");
  //.collection("heandweapon");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        // console.log(doc.data().kosa.test);
        // console.log(doc.data().keys);

        const armory = doc.data();
        console.log(Object.fromEntries(armory));

        // for (const [key, value] of Object.entries(armory.val())) {
        //   value['object_key'] = key;
        console.log(armory);
        console.table(armory);
        const test3 = Object.entries(test);
        console.log(test3);
        test3.map((el) => console.log(el));
        test3.map((el, index) => console.log(el, index));

        const myObjEntries = Object.entries(armory);
        for (const [key, value] of myObjEntries) {
          console.log(`
            key: ${key}
            value: ${value}
            entry: { ${key}: ${value} }
          `);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  //------
  const handweapons = db
    .collection("items")
    .doc("handWeapon")
    // .collection("weapon")
    .get()
    .then((doc) => {
      if (doc.exists) {
        // const test = querySnapshot.docs.map((el) => {
        return doc.data();
      }
      console.log(test);
      console.log(
        test.map((el) => {
          return el;
        })
      );
      console.log(Object.values(test));
    });

  const fetchItems = async () => {
    return db.collection("users")
      // .doc("test")
      // .collection("weapon")
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((user) => {
          const {
            exp,
            level,
            name,
            nextLevel,
            race,
            resources: { material, wood, gold },
            role,
            stats: { str, agi, tough, int, perc, vit, speed, left },
          } = user.data();
          console.log(user.data());
          console.log(user.id);
          console.log(race);
          console.log(user.data().resources);
          console.log(material);

          console.log(name);
          return {
            exp,
            level,
            name,
            nextLevel,
            race,
            resources: user.data().resources,
            gold,
            material,
            wood,
            role,
            stats: user.data().resources,
            str,
            agi,
            tough,
            int,
            perc,
            vit,
            speed,
            left,
            uid: user.id,
          };
        });
        console.log(users);
      });

    // return (
    //   db
    //     // .collection("items")
    //     .collection("userItems")
    //     .doc(uid)
    //     .collection("weapon")
    //     .get()
    //     .then((querySnapshot) => {
    //       const items = querySnapshot.docs.map((item) => {
    //         return {
    //           name: item.data().name,
    //           bonus1: item.data().bonus1,
    //           bonus2: item.data().bonus2,
    //           bonus3: item.data().bonus3,
    //           id: item.id,
    //           photo: item.data().photo,
    //         };
    //       });
    //       return items;
    //     })
    // );
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems().then((itemsFromDB) => {
      setItems(itemsFromDB);
    });
  }, []);
  console.log(items);
  console.table(items);

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
            <img
              src={item.photo}
              style={{
                width: "100%",
                border: "2px solid #e1984d",
                borderRadius: "10%",
              }}
            />
          </h4>
          <h4>{item.bonus1}</h4>
          <h4>{item.bonus2}</h4>
          <h4>{item.bonus3}</h4>
        </div>
      ))}
    </>
  );
};
