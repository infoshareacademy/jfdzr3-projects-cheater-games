import { useState, useEffect } from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { db } from "../firebaseConfig";
import s from "styled-components";

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
        rgba(0,0,0,0) 100%
      );
    background-position: 0 0;
    background-size: cover;
    transform: translateZ(-5px);
    opacity: ${(props) => props.highlight};
    transition: all 0.5s;
  }
`;

  const Button = s.button`
  // display: flex;
  padding: 20px;
  background: blue;
  `;

  const Image = s.img`
  transition: all 0.5s;
  display: block;
  max-height: 350px;
`;

  const Title = s.h2`
  position: absolute;
  color: white;
  font-size: 30px;
  text-shadow: 1px 1px 2px black;
  transform: translateY(-100px) translateX(-20px);
  transition: all 0.3s ease-in-out 0.5s;

  ${(props) =>
    props.show
      ? `
      opacity: 1;
      ::after {
        content: '';
        border-bottom: 2px solid white;
        width: 150px;
        display: block;
        margin-top: -5px;
        position: absolute;
        transition: width 1.5s;
        z-index: -1;
      }
      `
      : `
      opacity: 0; 
      transition: all 0.5s ease-in-out 0s; 
      transform: translateY(-100px) translateX(-20px);

      ::after {
        content: '';
        border-bottom: 2px solid white;
        width: 0;
        transition: width 2.5s;
        z-index: -1;
        display: block;
        margin-top: -5px;
        position: absolute;
      }
      `}
`;

  const positions = [
    { deg: 20, depth: -200, shading: 0.3, x: -100, highlight: 0 },
    { deg: 0, depth: 0, shading: 1, x: 0, highlight: 1 },
    { deg: -20, depth: -200, shading: 0.3, x: 100, highlight: 0 },
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

  const slides = [...races, ...races, ...races].slice(
    currentSlide + races.length - 1,
    currentSlide + races.length + 2
  );

  const getSlides = slides.map((slide) => ({
    ...slide,
  }));

  const user = useUser();

  const updateRace = () => {
    const { name } = slides[1];
    db.collection("users").doc(user.uid).update({
      race: name,
    });
  };

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
  if (slides.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="select-race">
      <div className="wrapper">
        <div className="slider">
          {getSlides.map((slide, i) => {
            const d =
              (((currentSlide + i) % positions.length) + positions.length) %
              positions.length;
            const { deg, depth, shading, x, highlight } = positions[d];
            return (
              <Slide
                highlight={highlight}
                style={{
                  order: d,
                  transform: `rotateY(${deg}deg) translateZ(${depth}px) translateX(${x}%)`,
                }}
              >
                <Image
                  src={slide.src}
                  key={slide.id}
                  alt={slide.name}
                  style={{ opacity: `${shading}` }}
                />
                <Title show={highlight === 1}>{slide.name}</Title>
              </Slide>
            );
          })}
        </div>
      </div>
      <Button onClick={getPrevSlide}>Poprzedni</Button>
      <Button onClick={getNextSlide}>Następny</Button>

      <div className="wrapper__desc">
        <h2 className="description race__name">{getSlides[1].name}</h2>
        <div className="description">{getSlides[1].description}</div>
        <div className="bonus bonus__title">Bonus rasowy:</div>
        <div className="bonus">
          {getSlides[1].bonus
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
            onClick={updateRace}
          >
            <button className="btn btn-green margin-right-medium">
              Wybierz rasę: {slides[1].name}
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
