import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";



export const Users = () => {
  // const uid = auth.currentUser.uid;
 
  const user = useUser();
  console.log(user);
  // const fetchItems = async () => {
  //   return db.collection("users")
  //     // .doc("test")
  //     // .collection("weapon")
  //     .get()
  //     .then((snapshot) => {
  //       const users = snapshot.docs.map((user) => {
  //         const {
  //           exp,
  //           level,
  //           name,
  //           nextLevel,
  //           race,
  //           resources: { material, wood, gold },
  //           role,
  //           stats: { str, agi, tough, int, perc, vit, speed, left },
  //         } = user.data();
  //         console.log(user.data());
  //         console.log(user.id);
  //         console.log(race);
  //         console.log(user.data().resources);
  //         console.log(material);

  //         console.log(name);
  //         return {
  //           exp,
  //           level,
  //           name,
  //           nextLevel,
  //           race,
  //           resources: user.data().resources,
  //           gold,
  //           material,
  //           wood,
  //           role,
  //           stats: user.data().resources,
  //           str,
  //           agi,
  //           tough,
  //           int,
  //           perc,
  //           vit,
  //           speed,
  //           left,
  //           uid: user.id,
  //         };
  //       });
  //     });
  // };
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetchItems().then((itemsFromDB) => {
  //     setUsers(itemsFromDB);
  //   });
  // }, []);
  // console.log(users);
  // console.table(users);

  // if (users === null) {
  //   return <p>Loading...</p>;
  // }
  // return (
  //   <>
  //     {users.map((user) => (
  //       <div
  //         key={user.id}
  //         style={{
  //           border: "1px solid lightgrey",
  //         }}
  //       >
  //         <h2>{user.name}</h2>
  //         <h4>
  //           <img
  //             src={user.photo}
  //             style={{
  //               width: "100%",
  //               border: "2px solid #e1984d",
  //               borderRadius: "10%",
  //             }}
  //           />
  //         </h4>
  //         <h4>{user.bonus1}</h4>
  //         <h4>{user.bonus2}</h4>
  //         <h4>{user.bonus3}</h4>
  //       </div>
  //     ))}
  //   </>
//  );
return null
};
