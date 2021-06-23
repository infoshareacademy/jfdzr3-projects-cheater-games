import { StatsContext } from './StatsProvider';
import { useContext } from 'react';

export function PointsLeft() {
  const [points] = useContext(StatsContext);
  return (
    <div className="user-stat__left">Pozostało punktów: {points.left}</div>
  );
}
