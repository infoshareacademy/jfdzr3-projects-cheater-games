import { StatsContext } from './StatsProvider';
import { useContext } from 'react';

export function PointsLeft() {
  const [points, setPoints] = useContext(StatsContext);
  return (
    <div className="user-stat__left">Pozostało punktów: {points.left}</div>
  );
}
