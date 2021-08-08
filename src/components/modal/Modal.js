import { useEffect, useState } from "react";
import { GenerateItem } from "../items/GenerateItem";
import easy1 from "./monsters/easy1.jpg";
import easy2 from "./monsters/easy2.jpg";
import easy3 from "./monsters/easy3.jpg";
import medium1 from "./monsters/medium1.jpg";
import medium2 from "./monsters/medium2.jpg";
import medium3 from "./monsters/medium3.jpg";
import hard1 from "./monsters/hard1.jpg";
import hard2 from "./monsters/hard2.jpg";
import hard3 from "./monsters/hard3.jpg";
import { useUser } from "../../hooks/useUser";
import { db } from "../../firebaseConfig";

const easyMonsters = [easy1, easy2, easy3];
const mediumMonsters = [medium1, medium2, medium3];
const hardMonsters = [hard1, hard2, hard3];

const drawNumber = (num, incr = 0) => Math.round(Math.random() * num) + incr;

export const Modal = ({ onClose, difficulty }) => {
  const [monsterImg, setMonsterImg] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [time, setTime] = useState(1000);
  const [gamePlaying, setGamePlaying] = useState(true);
  const [prize, setPrize] = useState(null);
  const user = useUser();

  const handleOnClick = () => {
    if (numClicks > 1) {
      setNumClicks(numClicks - 1);
    } else {
      setNumClicks(0);
      setGamePlaying(false);
    }
  };

  const handleDrawPrize = () => {
    let points, prize;
    if (difficulty === "easy") {
      points = drawNumber(2, 1);
    } else if (difficulty === "medium") {
      points = drawNumber(3, 2);
    } else {
      points = drawNumber(4, 3);
    }
    const randomNumber = drawNumber(1);
    const drawPrizeArr = [<GenerateItem />, points];
    prize = drawPrizeArr[randomNumber];
    if (typeof prize === "number") {
      setPrize(prize);
      db.collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          let stats = doc.data().stats;
          db.collection("users")
            .doc(user.uid)
            .update({ stats: { ...stats, left: stats.left + prize } });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setPrize(prize);
    }
  };

  useEffect(() => {
    const randomNumber = drawNumber(2);
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
    let timeoutId;
    if (gamePlaying === false) {
      return;
    }

    if (time <= 0) {
      setGamePlaying(false);
    }

    timeoutId = setTimeout(() => {
      setTime((previousTime) => previousTime - 10);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [gamePlaying, time]);

  if (gamePlaying) {
    return (
      <div className="fight-modal">
        <div className="fight-modal__heading">
          <h2>Walcz!</h2>
          <span>
            Pozostało ci: <code>{(time < 0 ? 0 : time / 1000).toFixed(2)}</code>{" "}
            sekund i {numClicks} kliknięć!
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
  }

  if (time > 0 && numClicks <= 0) {
    return (
      <div className="fight-modal">
        <div className="fight-modal__content">
          <div className="fight-modal__heading">
            <h1>Pokonałeś potwora!</h1>
            <span>Wylosuj swoją nagrodę!</span>
          </div>
          {!prize ? (
            <button className="btn btn-blue" onClick={handleDrawPrize}>
              Losuj
            </button>
          ) : null}
          {prize ? (
            <button className="btn btn-red" onClick={onClose}>
              Zamknij
            </button>
          ) : null}
          <div style={{ padding: "10px 0" }}>
            {typeof prize === "number"
              ? `Wygrywasz ${prize} pkt. statystyk!`
              : prize}
          </div>
        </div>
      </div>
    );
  }

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
};
