import { StatsContext } from "./StatsProvider";
import { useContext } from "react";

export function PointsLeft() {
  const [points] = useContext(StatsContext);
  return (
    <div className="user-stats__points-left">
      Pozostało punktów: {points.left}
    </div>
  );
}
