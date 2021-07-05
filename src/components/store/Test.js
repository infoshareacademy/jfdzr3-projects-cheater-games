import firebaseApp from "../../firebaseConfig";
import { useItems } from "../../hooks/useItems";

export const Test = () => {
  const items = useItems();
  console.log("-- Items --");
  console.log(items);
  // items.map((item) => {
  //     console.log("---- item key: ----");
  //   console.log(item.key);
  // });
  // items.map((item) => {
  //     console.log("--- item val: ---");
  //   console.log(item.val);
  // });
  // items.map((item) => {
  //     console.log("---value:-- ");
  //   console.log(item.val.value);
  // });
  // items.map((item) => {
  //     console.log("--- vit:--- " );
  //   console.log(item.val.vit);
  // });

  // items.map((item) => {
  //   console.log(item.id);
  // });

  // if (items === null) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      {/* <div className="item-list">
        <h2>For Sale</h2>
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <h3>{item.key}</h3>
              <h4>{item.val.value}</h4>
            </div>
          ))}
      </div> */}
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
