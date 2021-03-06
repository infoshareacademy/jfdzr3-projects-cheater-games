import { useState } from "react";
import { Link } from "react-router-dom";
import { ModalController } from "./modal/ModalController";

import {
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
  IoMdArrowRoundUp,
} from "react-icons/io";
import { useModal } from "../hooks/useModal";

const description = [
  {
    name: "Łatwy - Skraj lasu",
    abbr: "easy",
    descr: `Przyjemnie wyglądająca, wręcz zachęcająca ścieżka prowadzi wokół lasu.
    Idąc nią możesz się rozkoszować południowym słońcem, a kiedy żar będzie zbyt duży, możesz się schronić pod koronami drzew.
    Sielankowość tego widoku sprawia, że prędzej będziesz się spodziewać jakichś dwóch czy trzech rozbójników, niż faktycznie przerażających potworów.
    Jakkolwiek nie stanowiłoby to dla ciebie żadnego wyzwania, to jednak chyba nie spodziewasz się przy nich znaleźć nic wartościowego.`,
  },
  {
    name: "Średni - Leśne ostępy",
    abbr: "medium",
    descr: `Kiedy już udaje ci się nie myśleć o wymierzonych w ciebie łukach zdziczałych band Elfów czy
    Orków czających się w głębi puszczy, postanawiasz wziąć głęboki oddech i ruszyć w głąb lasu.
    Twój niepokój łagodzi nieco śpiew ptaków, gdzieś w koronach drzew a twoje bystre oczy dostrzegają od czasu do czasu rudą kitę wiewiórki czy mignięcie poroża jelenia.
    Zagłębiając się jednak w las, towarzyszy ci coraz mniej uspokajających odgłosów a coraz więcej złowieszczej ciszy.
    Choć niebezpieczeństwo zdaje się rosnąć z każdym krokiem, pewnym pocieszeniem jest świadomość wielkiej nagrody, która będzie czekać na ciebie na końcu.`,
  },
  {
    name: "Trudny - Najgłębszy matecznik",
    abbr: "hard",
    descr: `Ścieżka wiodąca wgłąb lasu już od samego początku wygląda ponuro. Właściwie nie jest to nawet ścieżka, co po prostu wydeptany przez zwierzynę wąski szlak.
    A prowadzi w samo jądro puszczy, w najciemniejszy mrok, w najgłębsze przepaście prastarego boru.
    Legendy głoszą, że można tam spotkać wszystko. Włącznie z mitycznym Leśnym Smokiem, pradawnym władcą pradawnych kniei.
    Śmiałkowie, którzy zapuszczają się tak daleko od swoich siedzib, czynią to na własną odpowiedzialność. I rzadko wracają.
    Ci, którzy jednak przeżyli przynoszą do obozowiska skarby, o których nikomu się nie śniło, a ich opowieści głoszą bezmiar łupu, który jeszcze oczekuje na swojego odkrywcę.`,
  },
];

export const HuntingScreen = () => {
  const [currentLevelId, setCurrentLevel] = useState(null);
  const [isOpen, toggleIsOpen] = useModal();

  const currentLevel = description.find((desc) => desc.abbr === currentLevelId);

  const ifEmpty = () => {
    if (currentLevel === undefined) {
      return (
        <p style={{ color: "red", fontSize: "20px" }}>
          Wybierz poziom trudności polowania wojowniku!
        </p>
      );
    } else {
      return <p> {currentLevel.descr}</p>;
    }
  };
  const LeftArrow = ({ toggleIsOpen }) => {
    return (
      <IoMdArrowRoundBack
        onClick={toggleIsOpen}
        className="chose__way__arrow"
      />
    );
  };
  const RightArrow = ({ toggleIsOpen }) => {
    return (
      <IoMdArrowRoundForward
        onClick={toggleIsOpen}
        className="chose__way__arrow"
      />
    );
  };
  const UpArrow = ({ toggleIsOpen }) => {
    return (
      <IoMdArrowRoundUp onClick={toggleIsOpen} className="chose__way__arrow" />
    );
  };

  return (
    <>
      <section className="hunting-screen">
        <div className="hunting__screen-title">
          <h1>Polowanie</h1>
        </div>
        <div className="hunting__screen-description">
          <p>
            Do twojego obozowiska znów dotarły złowieszcze plotki. W głębi lasu
            czają się okrutne monstra, których żądza krwi przekracza pojmowanie
            większości przedstawicieli rozumnych ras. Nie dotyczy to jednak
            ciebie. To twoje życie i twoje powołanie. Teraz, stojąc na samej
            krawędzi przepastnej puszczy, musisz wybrać ścieżkę, którą podążysz.
            Czy pójdziesz skrajem lasu, czy zagłębisz się w najczarniejszy
            matecznik, na twojej drodze stanie wyzwanie, niewątpliwie
            przekraczające zdolności zwykłego śmiertelnika. Wybierz swoją drogę,
            więc, i ruszaj!
          </p>
        </div>
        <div className="hunting__screen-main">
          <h3>Poziom trudności: </h3>
          <div className="hunting__screen--choose_level">
            {description.map((desc, index) => (
              <label key={index}>
                {desc.name}
                <input
                  type="radio"
                  name="level"
                  onClick={() => setCurrentLevel(desc.abbr)}
                />
              </label>
            ))}
          </div>
          <div className="hunting__screen--level_description">
            <div>{ifEmpty()}</div>
          </div>
          <div
            className="hunting__screen--level-arrows"
            style={currentLevelId ? { display: "block" } : { display: "none" }}
          >
            <h3>Wybierz ścieżkę polowania</h3>
            <div className="hunting__screen--choose_ways">
              <Link to="/hunt" className="choose__ways__arrows-links">
                <LeftArrow toggleIsOpen={toggleIsOpen} />
              </Link>
              <Link to="/hunt" className="choose__ways__arrows-links">
                <UpArrow toggleIsOpen={toggleIsOpen} />
              </Link>
              <Link to="/hunt" className="choose__ways__arrows-links">
                <RightArrow toggleIsOpen={toggleIsOpen} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ModalController
        open={isOpen}
        onClose={toggleIsOpen}
        difficulty={currentLevelId}
      />
    </>
  );
};
