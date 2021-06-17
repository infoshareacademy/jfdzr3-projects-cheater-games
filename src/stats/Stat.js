import './Stats.css';

export default function Stat(props) {
  const { title, statAbr, statPoints } = props;
  return (
    <div className="user-stats">
      <div className="user-stats__title">{title}</div>
      <div className="user-stats__right">
        <div className="user-stats__points">{statPoints}</div>
        <button className="user-stats__button">+</button>
        <button className="user-stats__button">-</button>
      </div>
    </div>
  );
}
