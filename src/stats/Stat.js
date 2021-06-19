// import './Stats.css';
import { StatsContext } from './StatsProvider';
import { useContext } from 'react';

export function Stat(props) {
  const { title, statAbr } = props;
  const [points, setPoints] = useContext(StatsContext);
  return (
    <div className="user-stats">
      <div className="user-stats__title">{title}</div>
      <div className="user-stats__right">
        <div className="user-stats__points">{points[statAbr]}</div>
        <button className="user-stats__button" id={statAbr}>
          +
        </button>
        <button className="user-stats__button" id={statAbr}>
          -
        </button>
      </div>
    </div>
  );
}
