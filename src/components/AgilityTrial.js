import { useUser } from "../hooks/useUser";
import { usePlayerStats } from "../hooks/usePlayerStats";

export const AgilityTrial = () => {
    const user = useUser();

    const stats = usePlayerStats(user);

  if(stats === null) {
    return <div>Czekam na dane</div>
  }

    console.log(user);
    console.log(stats);
    return <></>;
}