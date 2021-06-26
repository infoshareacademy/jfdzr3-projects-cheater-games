import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const UserItems = () => {
  const user = useUser();
  const uid = auth.currentUser.uid;
  console.log(uid);
  console.log(user);
  const fetchItems = async () => {
    const userWeapon = db
      .collection("userItems/uid/weapon")
      // .doc(uid)
      console.log(userWeapon);
      userWeapon.get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        console.log(querySnapshot.docs);
        querySnapshot.forEach((snap) => {
          console.log(snap);
          console.log(snap.docs());

          const items = snap.data()
          console.log(items);
        })
        // items.forEach((item) =>{
        //   const item = item.data();
        //   console.log(item);
        })
      
        // console.log(item.docs.data());

        // console.log(item.data());
        // const items = item.data();
        // console.log(items);
        // return {
        //   name: items.name,
        //   bonus1: items.bonus1,
        //   bonus2: items.bonus2,
        //   bonus3: items.bonus3,
        //   id: items.id,
        //   photo: items.photo,
        //   items,
        // };
      // });
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
    null
      {/* <div
        key={items.id}
        style={{
          border: "1px solid lightgrey",
        }}
      >
        <h2>{items.name}</h2>
        <h4>
          <img
            src={items.photo} alt={items.name}
            style={{
              width: "100%",
              border: "2px solid #e1984d",
              borderRadius: "10%",
            }}
          />
        </h4>
        <h4>{items.bonus1}</h4>
        <h4>{items.bonus2}</h4>
        <h4>{items.bonus3}</h4>
      </div> */}
    </>
  );
};
