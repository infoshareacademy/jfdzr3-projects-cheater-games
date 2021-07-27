import { useState, useEffect } from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { db } from "../firebaseConfig";
import s from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slide = s.div`
  background: black;
  top: 25%;
  position: absolute;
  transition: all 0.5s;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
  :hover {
    box-shadow: 0 0 1px rgba(255, 255, 255, 1);
    ${(props) =>
      props.highlight === 1 ? `transform: translateY(-10px) !important;` : ``}
  }
  :before {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: 0;
    left: -1px;
    background: rgb(255,255,255);
    background: 
      linear-gradient(
        rgba(255,255,255,1) 0%, 
      );
    background-position: 0 0;
    background-size: cover;
    transform: translateZ(-5px);
    opacity: ${(props) => props.highlight};
    transition: all 0.5s;
  }
`;
const Image = s.img`
  transition: all 0.5s;
  display: block;
  max-height: 350px;
`;

export const SelectRace = () => {
  const getRaceFromDB = () => {
    return db
      .collection("races")
      .get()
      .then((race) => {
        const cards = race.docs.map((doc, i) => {
          return {
            id: i + 1,
            name: doc.id,
            src: `${process.env.PUBLIC_URL}/img/races/${doc.id}.jpg`,
            description: doc.data().descr,
            bonus: [
              { name: "str", change: doc.data().str },
              { name: "agi", change: doc.data().agi },
              { name: "tough", change: doc.data().tough },
              { name: "vit", change: doc.data().vit },
              { name: "perc", change: doc.data().perc },
              { name: "int", change: doc.data().int },
              { name: "speed", change: doc.data().speed },
              { name: "def", change: doc.data().def },
              { name: "gold", change: doc.data().gold },
              { name: "wood", change: doc.data().wood },
              { name: "mat", change: doc.data().mat },
            ],
          };
        });
        return cards;
      });
  };
  const positions = [
    { deg: 0, depth: 0, shading: 1, x: 0, highlight: 1 },
    { deg: -20, depth: -200, shading: 0.3, x: 100, highlight: 0 },
    { deg: 0, depth: -200, shading: 1, x: 0, highlight: 1 },
    { deg: 20, depth: -200, shading: 0.3, x: -100, highlight: 0 },
  ];
  const [races, setRaces] = useState([]);
  useEffect(() => {
    getRaceFromDB().then((racesFromDB) => {
      setRaces(racesFromDB);
    });
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const getNextSlide = () => setCurrentSlide((x) => (x + 1) % races.length);
  const getPrevSlide = () =>
    setCurrentSlide((x) => (x - 1 + races.length) % races.length);

  const user = useUser();
  const unitsMap = {
    str: { label: "Siła" },
    agi: { label: "Zręczność" },
    tough: { label: "Wytrzymałość" },
    vit: { label: "Żywotność" },
    perc: { label: "Spostrzegawczość" },
    int: { label: "Inteligencja" },
    speed: { label: "Szybkość" },
    def: { label: "Obrona" },
    gold: { label: "Przyrost złoto", unit: "/h" },
    wood: { label: "Przyrost drewna", unit: "/h" },
    mat: { label: "Przyrost materiału", unit: "/h" },
  };
  if (races.length === 0) {
    return <p>Loading...</p>;
  }
  const dataIndex = (currentSlide + races.length) % races.length;
  const { bonus, name, description } = races[dataIndex];
  const updateRace = (name) => {
    db.collection("users").doc(user.uid).update({
      race: name,
    });
  };
  return (
    <section className="select-race">
      <div className="wrapper">
        <div className="slider">
          <BsChevronLeft className="arrow prev" onClick={getPrevSlide} />
          <BsChevronRight className="arrow next" onClick={getNextSlide} />
          {races.map((slide, i) => {
            const d =
              (((currentSlide - i) % positions.length) + positions.length) %
              positions.length;
            const { deg, depth, shading, x, highlight } = positions[d];
            return (
              <Slide
                key={slide.id}
                highlight={highlight}
                style={{
                  order: d,
                  transform: `rotateY(${deg}deg) translateZ(${depth}px) translateX(${x}%)`,
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.name}
                  style={{ opacity: `${shading}` }}
                />
              </Slide>
            );
          })}
        </div>
      </div>

      <div className="wrapper__desc">
        <h2 className="description race__name">{name}</h2>
        <div className="description">{description}</div>
        <div className="bonus bonus__title">Bonus rasowy:</div>
        <div className="bonus">
          {bonus
            .filter((bonus) => bonus.change !== 0)
            .map((bonus) => (
              <div key={bonus.name}>
                {unitsMap[bonus.name]?.label || bonus.name}:{" "}
                {bonus.change > 0 ? "+" : ""}
                {bonus.change}
                {unitsMap[bonus.name]?.unit}
              </div>
            ))}
        </div>
        <div className="wrapper-choosing-race">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => updateRace(name)}
          >
            <button className="btn btn-green margin-right-medium">
              Wybierz rasę: {name}
            </button>
          </Link>
          <button className="btn btn-red">
            <Logout />
          </button>
        </div>
      </div>
    </section>
  );
};
