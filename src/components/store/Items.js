import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const Items = () => {

    const user = useUser();
    const [items, setItems] = useState([]);
    const [keys, setKeys] = useState([])
    
    useEffect(() => {
        if (user?.uid === null) {
            setItems(null);
            return;
        }
        
        return  db.collection("items")
        .onSnapshot((doc) => {
                  const testarr = [];

                  const testData = []
                doc.forEach((doc) => {
                const data = doc.data()
                testData.push(data)
                // data.map((el) => {
                //     return testData.push(el)
                // })
                console.log(testData);
                console.log(testData.miecz);
const {miecz, kosa, Miecz} = keys
                console.log(data);
                console.log(data.Miecz);
                console.log(data.miecz);
                console.log(data.keys);



                console.log(doc.id);
            

                const valuesArr = []
                

    console.log(valuesArr);
        console.log(valuesArr);

        console.log(Object.keys(data));
        console.log(Object.keys(data).map((k)=>k));
        console.log(Object.keys(data).map((k)=>data[k]));
console.log(data.kosa);

     
        console.log(Object.values(data));

      
               const testkey=  Object.keys(data).map((k) => {
                   console.log(k);
                   valuesArr.push({k: data[k]})
                    console.log(`key: ${k}`);
                    console.log("key:" +k, data[k]);
                    console.log(data[k]);

                    return  data[k]
                  });
            console.log(testkey);

                //   testarr.push({id: doc.id,key: testkey, ...doc.data() })
                testarr.push({...doc.data() })
                console.log(Object.keys(data));
                // setItems({ id: doc.id, key: testkey, ...doc.data
                // () })
                // setItems([ testarr ])
                setItems([ testarr ])

                setKeys({ key: Object.keys(data)})
                })
                const {miecz, kosa, Miecz} = keys

                console.log(testarr);
                console.log(testarr.keys);


                return testarr
              })
              }, []);


            
              console.log(items);
              console.log(items.Miecz);
              console.log(items.miecz);



            //   console.table(items);
    
            //   console.log(items.key);
    
              console.log(keys);
    
      console.log(user);
     
      

    //   if (testarr === null) {
    //     return <p>Loading...</p>;
    //   }
    return (
        
    <>
    {items && items.map((weapon) => (
      <div
        key={weapon.id}
        style={{
          border: "1px solid lightgrey",
        }}
      >

        <h2>{weapon.key}</h2>
        <div>{weapon.id}</div>
        <div>{weapon.key}</div>
        <div>{weapon.def}</div>
        <div>{weapon.value}</div>


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
    ))}
  </>
    )
};