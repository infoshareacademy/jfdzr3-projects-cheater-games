import firebase from 'firebase/app';
import 'firebase/firestore';
import Heading from './Heading';
import Wrapper from './Wrapper';
import Stat from './Stat';
import './Stats.css';
import { StatsProvider } from './StatsProvider';

const db = firebase.firestore();

// Test
const id = 'test-user';

export default function Stats() {
  return (
    <StatsProvider>
      <main className="main">
        <Heading />
        <Wrapper>
          {/* <div className="user-stat__left">
            Pozostało punktów: {points.left}
          </div> */}
          <Stat title="Siła" statAbr="str" />
          <Stat title="Zręczność" statAbr="agi" />
          <Stat title="Wytrzymałość" statAbr="tough" />
          <Stat title="Inteligencja" statAbr="int" />
          <Stat title="Spostrzegawczość" statAbr="perc" />
          <button className="btn">Zatwierdź</button>
        </Wrapper>
      </main>
    </StatsProvider>
  );
}
