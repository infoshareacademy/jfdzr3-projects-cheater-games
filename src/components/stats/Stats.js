import { Heading } from "./Heading";
import { Form } from "./Form";
import { Stat } from "./Stat";
import { StatsProvider } from "./StatsProvider";
import { PointsLeft } from "./PointsLeft";
import { SubmitButton } from "./SubmitButton";
import { Main } from "./Main";
import "./Stats.css";
import { useUser } from "../../hooks/useUser";

export function Stats() {
  const user = useUser();
  return (
    <StatsProvider uid={user?.uid}>
      <Main>
        <Heading />
        <Form uid={user?.uid}>
          <PointsLeft />
          <Stat title="Siła" statAbr="str" />
          <Stat title="Zręczność" statAbr="agi" />
          <Stat title="Wytrzymałość" statAbr="tough" />
          <Stat title="Żywotność" statAbr="vit" />
          <Stat title="Spostrzegawczość" statAbr="perc" />
          <Stat title="Inteligencja" statAbr="int" />
          <Stat title="Szybkość" statAbr="speed" />
          <SubmitButton />
        </Form>
      </Main>
    </StatsProvider>
  );
}
