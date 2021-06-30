import { Heading } from "./Heading";
import { Form } from "./Form";
import { Stat } from "./Stat";
import { StatsProvider } from "./StatsProvider";
import { PointsLeft } from "./PointsLeft";
import { SubmitButton } from "./SubmitButton";
import { Main } from "./Main";
import "./Stats.css";

export function Stats() {
  return (
    <StatsProvider>
      <Main>
        <Heading />
        <Form>
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
