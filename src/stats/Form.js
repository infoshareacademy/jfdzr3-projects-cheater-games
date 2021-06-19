import firebase from 'firebase/app';
import 'firebase/firestore';
import { useContext } from 'react';
import { StatsContext } from './StatsProvider';

const db = firebase.firestore();

// Test
const id = 'test-user';

export function Form(props) {
  const [points] = useContext(StatsContext);
  const addPointsToDatabase = (e) => {
    e.preventDefault();
    db.collection('stats').doc(id).set(points);
  };
  return (
    <form className="user-stats__form" onSubmit={addPointsToDatabase}>
      {props.children}
    </form>
  );
}
