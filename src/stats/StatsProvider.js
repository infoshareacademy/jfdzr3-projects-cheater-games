import firebase from 'firebase/app';
import { useState, useEffect, createContext } from 'react';

const db = firebase.firestore();
const id = 'test-user';

export const StatsContext = createContext();

export function StatsProvider(props) {
  const [points, setPoints] = useState({});
  useEffect(() => {
    db.collection('stats')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const stats = doc.data();
          setPoints(stats);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, {});
  return <StatsContext.Provider>{props.children}</StatsContext.Provider>;
}
