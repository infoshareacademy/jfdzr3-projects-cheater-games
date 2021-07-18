import { useState, useEffect } from "react";
import { Logout } from "../auth/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { db } from "../firebaseConfig";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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

  const [races, setRaces] = useState([]);

  useEffect(() => {
    getRaceFromDB().then((racesFromDB) => {
      setRaces(racesFromDB);
    });
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const getNextSlide = () => setCurrentSlide((old) => (old + 1) % races.length);
  const getPrevSlide = () =>
    setCurrentSlide((old) => (old - 1 + races.length) % races.length);

  const slides = [...races, ...races, ...races].slice(
    currentSlide + races.length - 1,
    currentSlide + races.length + 2
  );

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

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings = {
    infinite: false,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="select-race">
      <div className="carousel">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div className={slide === slide[1] ? "slide activeSlide" : "slide"}>
              <img
                key={slide.id}
                src={slide.src}
                alt={slide.src}
                style={{ height: "400px", width: "350px" }}
              ></img>
            </div>
          ))}
        </Slider>
      </div>
      <div className="wrapper__desc">
        <h2 className="description race__name">{slides[1].name}</h2>
        <div className="description">{slides[1].description}</div>
        <div className="bonus bonus__title">Bonus rasowy:</div>
        <div className="bonus">
          {slides[1].bonus
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
        <div className="wrapper">
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
