import Heading from './Heading';
import Wrapper from './Wrapper';
import Stat from './Stat';
import './Stats.css';

const stats = {
  str: 0,
  agi: 0,
  tough: 0,
  int: 0,
  perc: 0,
  left: 10,
};

export default function Stats() {
  return (
    <main className="main">
      <Heading />
      <Wrapper>
        <div className="user-stat__left">Pozostało punktów: {stats.left}</div>
        <Stat title="Siła" statAbr="str" statPoints={stats.str} />
        <Stat title="Zręczność" statAbr="agi" statPoints={stats.agi} />
        <Stat title="Wytrzymałość" statAbr="tough" statPoints={stats.tough} />
        <Stat title="Inteligencja" statAbr="int" statPoints={stats.int} />
        <Stat title="Spostrzegawczość" statAbr="perc" statPoints={stats.perc} />
      </Wrapper>
    </main>
  );
}
