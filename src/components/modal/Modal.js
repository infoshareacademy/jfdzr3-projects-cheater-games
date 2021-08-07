import { useEffect, useState } from "react";
import easy1 from "./monsters/easy1.jpg";
import easy2 from "./monsters/easy2.jpg";
import easy3 from "./monsters/easy3.jpg";
import medium1 from "./monsters/medium1.jpg";
import medium2 from "./monsters/medium2.jpg";
import medium3 from "./monsters/medium3.jpg";
import hard1 from "./monsters/hard1.jpg";
import hard2 from "./monsters/hard2.jpg";
import hard3 from "./monsters/hard3.jpg";

const easyMonsters = [easy1, easy2, easy3];
const mediumMonsters = [medium1, medium2, medium3];
const hardMonsters = [hard1, hard2, hard3];

export const Modal = ({ onClose, difficulty }) => {
  const [monsterImg, setMonsterImg] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [time, setTime] = useState(0);
  const [gamePlaying, setGamePlaying] = useState(true);

  const handleOnClick = () => {
    if (numClicks > 0) {
      setNumClicks(numClicks - 1);
    } else {
      setGamePlaying(false);
    }
  };

  useEffect(() => {
    const randomNumber = Math.round(Math.random() * 2);
    console.log(randomNumber);
    let drawnMonster, numClicks, time;
    if (difficulty === "easy") {
      drawnMonster = easyMonsters[randomNumber];
      numClicks = 10;
      time = 2000;
    } else if (difficulty === "medium") {
      drawnMonster = mediumMonsters[randomNumber];
      numClicks = 15;
      time = 2000;
    } else {
      drawnMonster = hardMonsters[randomNumber];
      numClicks = 10;
      time = 1000;
    }
    setMonsterImg(drawnMonster);
    setNumClicks(numClicks);
    setTime(time);
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (gamePlaying && time >= 0) {
      interval = setInterval(() => {
        setTime((previousTime) => previousTime - 10);
      }, 10);
      return () => clearInterval(interval);
    } else {
      clearInterval(interval);
      setGamePlaying(false);
    }
  }, [time, gamePlaying]);

  if (gamePlaying) {
    return (
      <div className="fight-modal">
        <div className="fight-modal__heading">
          <h2>Walcz!</h2>
          <span>
            Pozostało ci: {time < 0 ? 0 : time / 1000} sekund i {numClicks}{" "}
            kliknięć!
          </span>
        </div>
        <div className="fight-modal__content">
          <img
            src={monsterImg}
            style={{ height: "450px" }}
            alt=""
            onClick={handleOnClick}
          />
        </div>
      </div>
    );
  } else if (!gamePlaying && time > 0 && numClicks === 0) {
    return (
      <div className="fight-modal">
        <div className="fight-modal__content">
          <div className="fight-modal__heading">
            <h1>Pokonałeś potwora!</h1>
            <span>Wybierz swoją nagrodę!</span>
          </div>
        </div>
      </div>
    );
  } else if (!gamePlaying && time <= 0 && numClicks > 0) {
    return (
      <div className="fight-modal">
        <div className="fight-modal__content">
          <div className="fight-modal__heading">
            <h1>Porażka!</h1>
            <span>Zamknij okno i spróbój ponownie!</span>
          </div>
          <button className="btn btn-red" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    );
  }
};
