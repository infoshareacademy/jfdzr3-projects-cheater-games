import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseApp from '../firebaseConfig';
import Heading from './Heading';
import Wrapper from './Wrapper';
import Stat from './Stat';
import './Stats.css';
import { useState, useEffect } from 'react';

const db = firebase.firestore();

// Test
const id = 'test-user';

export default function Stats() {
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
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, {});
  return (
    <main className="main">
      <Heading />
      <Wrapper>
        <div className="user-stat__left">Pozostało punktów: {points.left}</div>
        <Stat title="Siła" statAbr="str" statPoints={points.str} />
        <Stat title="Zręczność" statAbr="agi" statPoints={points.agi} />
        <Stat title="Wytrzymałość" statAbr="tough" statPoints={points.tough} />
        <Stat title="Inteligencja" statAbr="int" statPoints={points.int} />
        <Stat
          title="Spostrzegawczość"
          statAbr="perc"
          statPoints={points.perc}
        />
        <button className="btn">Zatwierdź</button>
      </Wrapper>
    </main>
  );
}
