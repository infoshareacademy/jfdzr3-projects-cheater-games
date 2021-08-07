import { useEffect, useState } from "react";
import easy1 from "./monsters/easy1.jpg";
import easy2 from "./monsters/easy2.jpg";
import easy3 from "./monsters/easy3.jpg";
import medium1 from "./monsters/medium1.jpg";
import medium2 from "./monsters/medium2.jpg";
import medium3 from "./monsters/medium3.jpg";
import hard1 from "./monsters/hard3.jpg";
import hard2 from "./monsters/hard1.jpg";
import hard3 from "./monsters/hard2.jpg";

const easyMonsters = [easy1, easy2, easy3];
const mediumMonsters = [medium1, medium2, medium3];
const hardMonsters = [hard1, hard2, hard3];

export const Modal = ({ onClose, difficulty }) => {
  const [monsterImg, setMonsterImg] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [time, setTime] = useState(null);
  const [gamePlaying, setGamePlaying] = useState(true);

  const handleOnClick = () => {
    if (numClicks > 0) {
      setNumClicks(numClicks - 1);
    } else {
      setGamePlaying(false);
    }
  };

  useEffect(() => {
    const randomNumber = Math.round(Math.random() * 3);
    let drawnMonster, numClicks, time;
    if (difficulty === "easy") {
      drawnMonster = easyMonsters[randomNumber];
      numClicks = 10;
      time = 3000;
    } else if (difficulty === "medium") {
      drawnMonster = mediumMonsters[randomNumber];
      numClicks = 20;
      time = 2000;
    } else {
      drawnMonster = hardMonsters[randomNumber];
      numClicks = 30;
      time = 1000;
    }
    setMonsterImg(drawnMonster);
    setNumClicks(numClicks);
    setTime(time);
  }, [difficulty]);
  return (
    <div className="modal">
      <div className="modal__heading">
        <h2>Walcz!</h2>
        <span>
          Pozostało ci: {time} sekund i {numClicks} kliknięć!
        </span>
      </div>
      <div className="modal__content">
        <img
          src={monsterImg}
          style={{ height: "450px" }}
          alt=""
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};
