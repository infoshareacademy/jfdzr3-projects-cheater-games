import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";

export const UserItems = () => {
  const user = useUser();
  const uid = user?.uid;

  const fetchItems = async () => {
    if (uid) {
    return db
      .collection("userItems")
      .doc(uid)
      .collection("weapon")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        const weapons = snapshot.docs.map((weapon) => {
          console.log(weapon.data());
          console.log(weapon.data().name);

          console.log(weapon);

          return {
            name: weapon.data().name,
            bonus1: weapon.data().bonus1,
            bonus2: weapon.data().bonus2,
            bonus3: weapon.data().bonus3,
            id: weapon.data().id,
            id2: weapon.id,

            photo: weapon.data().photo,
          };
        });
        console.table(weapons);

        return weapons;
      });
    }
  };

  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    fetchItems().then((itemsFromDB) => {
      setWeapons(itemsFromDB);
    });
  }, []);

  if (weapons === null) {
    return <p>Loading...</p>;
  }
  console.log(weapons);

  return (
    <>
      {/* {weapons.map((weapon) => (
        <div
          key={weapon.id}
          style={{
            border: "1px solid lightgrey",
          }}
        >
          <h2>{weapon.name}</h2>
          <h4>
            <img
              src={weapon.photo}
              alt={weapon.name}
              style={{
                width: "100%",
                border: "2px solid #e1984d",
                borderRadius: "10%",
              }}
            />
          </h4>
          <h4>{weapon.bonus1}</h4>
          <h4>{weapon.bonus2}</h4>
          <h4>{weapon.bonus3}</h4>
        </div>
      ))} */}
    </>
  );
};


