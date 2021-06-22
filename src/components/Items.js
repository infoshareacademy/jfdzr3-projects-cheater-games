import { Children, useEffect, useState } from "react";
import firebaseApp, { db } from "../firebaseConfig";


export const Items = () => {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    // const response = db.collection("testItems");
    // const data = await response.get();
    // data.docs.forEach((item) => {
    //   setItems([...items, item.data()]);
    //   console.log(items);
    // });
    const response = db.collection("testItems");
    const data = await response.get()
.then(querySnapshot => {
   querySnapshot.docs.forEach(item =>{
    console.log(item.data())
    setItems ([...items, item.data() ]);
  });
  })
}
  useEffect(() => {
      fetchItems();
  }, [])
  return (
      <div>
          {items.map((item) => {
              return <>
               <ul key={item.id}>
              <li key={item.id}>{item.nazwa}</li>
              <li key={item.id}>{item.bonus1}</li>
              <li key={item.id}>{item.bonus2}</li>
              <li key={item.id}>{item.bonus3}</li>
            </ul>
            <ul key={item.id}>
              <li key={item.id}>{item.nazwa}</li>
              <li key={item.id}>{item.bonus1}</li>
              <li key={item.id}>{item.bonus2}</li>
              <li key={item.id}>{item.bonus3}</li>
            </ul>
          </>
          })}
      </div>
    //   <div>
    //       {
    //           items && items.map(item => {
    //               return (
    //                  <> <div key={item.id}>
    //                     <h4>{item.nazwa}</h4>
    //                     <h4>{item.bonus1}</h4>
    //                     <h4>{item.bonus2}</h4>
    //                     <h4>{item.bonus3}</h4>
    //                   </div>
    //                  </>
    //               )
    //           })
    //       }

    //   </div>
  )
};
// -----------
//data.docs.forEach((item) => {
    //     //   setItems([...items, item.data()]);
    //     //   console.log(items);

// export const Items = () => {
//     let currentUser = firebaseApp.auth().currentUser;
// const [items, setItems] = useState([]);

// // db.collection('testItems').get().then(snapshot => {
// //     const data = snapshot.docs.map(item => {
// //        setItems ([...items,item.data()]);

// //        console.log(items);
// //        console.log(currentUser);
// //        // renderItems(doc);
// //     })
// //    });
//         return (
//             <div>
//                 {/* {data.map(doc => {
//         return doc.photoURL})} */}
//             </div>
//      )
    

// //     db.collection("users")
// // .get()
// // .then(querySnapshot => {
// //   const data = querySnapshot.docs.map(doc => doc.data());
// //   console.log(data); // array of users objects
// //   console.log(data.map(doc => {
// // return doc.photoURL
// //   }));
// // });



// };
