import { useState, useEffect } from "react";
import firebase from "firebase";

const db = firebase.firestore();

const cards2 = [];

// const getRaceFromDB = () => {
//   db.collection('races').get().then(race => {
//   race.docs.forEach((doc, i) =>  {
//     cards2[i] = {
//       id: i+1,
//       src: `${process.env.PUBLIC_URL + "./img/races/" + `${doc.id}` + ".jpg"}`,
//       description: doc.data().descr,
//       bonus: [
//         { name: "str", change: doc.data().str },
//         { name: "agi", change: doc.data().agi },
//         { name: "tough", change: doc.data().tough },
//         { name: "vit", change: doc.data().vit },
//         { name: "perc", change: doc.data().perc },
//         { name: "int", change: doc.data().int },
//         { name: "speed", change: doc.data().speed },
//         { name: "def", change: doc.data().def },
//         { name: "gold", change: doc.data().gold },
//         { name: "wood", change: doc.data().wood },
//         { name: "mat", change: doc.data().mat },
//       ]
//     };
//   });
// })
// return cards2;
// }

const cardsX = [
  {
    id: 1,
    src: `${process.env.PUBLIC_URL + "./img/races/Krasnolud.jpg"}`,
    name: "Krasnolud",
    description: `Uparty i zawzięty lud z gór. Ich legendy głoszą, że pewnego dnia bogowie zaprosili siedmiu najznamienitszych kowali i rzemieślników na wielką ucztę w górach, aby zachwycać się ich kunsztem. W trakcie uczty, zauroczeni bogowie zapragnęli jeszcze piękniejszych wyrobów i jeszcze znakomitszych dzieł. Dlatego do dziś Krasnoludy dążą do doskonałości. Ich upór i odwaga prowadzą ich do ciągłego rozwoju, co jednak nie przysparza im sympatii wśród pozostałych ras. Szczególnie Elfy mają ich za zarozumiałych, upartch jak osły gburów, których kuźnie i huty zatruwają dziewicze lasy górskich zboczy. Krasnoludy zazwyczaj nic sobie z tych pretensji nie robią - jak powiedział kiedyś jeden z krasnoludzki płócienników: "Zwisa im to i powiewa". Oczywiście olbrzymi rozwój metalurgii i kowalstwa sprawił, że krasnoludzka broń jest uznawana za najlepszą na świecie, a Krasnoludy za twardych i nieustępliwych wojowników. Również wydobyciem kruszców, zwłaszcza złota i rud metali, przewyższają nawet żyjących w górzystych terenach Ludzi.`,
    bonus: [
      { name: "str", change: 5 },
      { name: "agi", change: 0 },
      { name: "tough", change: 10 },
      { name: "vit", change: 5 },
      { name: "perc", change: 0 },
      { name: "int", change: 0 },
      { name: "speed", change: -10 },
      { name: "def", change: 15 },
      { name: "gold", change: 50 },
      { name: "wood", change: 0 },
      { name: "mat", change: 0 },
    ],
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL + "./img/races/Człowiek.jpg"}`,
    name: "Człowiek",
    description: `Kiedy dokładnie Ludzie pojawili się na Kontynencie i z jakiej konkretnej przyczyny, nie jest do końca wiadome nawet Elfom. Choć uzurpują sobie prawo do wiedzy o wszystkim co się dzieje na świecie, historia ludzkości, a przynajmniej jej początki, umykają nawet pradawnym pismom Elfów. Wiadomo jest za to, że ze swoją, raczej śmieszną, długością życia i pewną nerwowością w poczynaniach, to Ludzie (oprócz Krasnoludów) są główną siłą napędową postępu dokonującego się na świecie. Wszystko oczywiście ma swój koszt, więc Elfy z niepokojem patrzą na coraz silniejszy wpływ Ludzi na środowisko, rozwój ich miast, będących źródłem nieznanych wcześniej chorób, czy zmniejszających się powierzchni leśnych. Wraz z rozwojem ludzkiej wiedzy i umiejętności, kurczą się też legendy, Ludzie chcą wszystko wyjaśnić, zracjonalizować, dlatego bez ustanku polują na wszelkie przejawy "legendarnych zabobonów". Tym niemniej dzięki temu, Ludzie odznaczają się dużą sprawnością i odpornością na niespodziewane sytuacje.`,
    bonus: [
      { name: "str", change: 5 },
      { name: "agi", change: 0 },
      { name: "tough", change: 5 },
      { name: "vit", change: 5 },
      { name: "perc", change: 0 },
      { name: "int", change: 0 },
      { name: "speed", change: 0 },
      { name: "def", change: 15 },
      { name: "gold", change: 0 },
      { name: "wood", change: 0 },
      { name: "mat", change: 6 },
    ],
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL + "./img/races/Elf.jpg"}`,
    name: "Elf",
    description: `Prawodpodobnie słusznie Elfy są uznawane za najmądrzejszą i najstarszą z ras zamieszkujących Kontynent. Ich wrodzona inteligencja i bystrość umysłu pozwalają im na unikanie wielu pułapek rozwijającego się świata. Wciąż stanowiąc nierozwiązaną zagadkę dla innych ras, Elfy usiłują żyć tak samo jak ich przodkowie przed tysiącami lat. Obdarzeni niezwykle długim życiem, są jednak bardziej podatni na nowe choroby, których wylęgarnie stanowią ciągle rozwijające się ludzkie miasta. W lesie potrafią poruszać się praktycznie bezszelestnie, błyskawicznie wynajdując optymalne ścieżki czy naturalne miejsca, w których mogą się schować lub zaczaić. Choć zdarza im się odwiedzać ludzkie miasta, to dla wielu Ludzi pozostają pewną zagadką. Krasnoludy z kolei traktują Elfy z chłodnym dystansem, co nie przeszkadza im regularnie wysyłać handlowych karawan na ich tereny.`,
    bonus: [
      { name: "str", change: 0 },
      { name: "agi", change: 5 },
      { name: "tough", change: -15 },
      { name: "vit", change: 0 },
      { name: "perc", change: 5 },
      { name: "int", change: 10 },
      { name: "speed", change: 0 },
      { name: "def", change: 0 },
      { name: "gold", change: 0 },
      { name: "wood", change: 6 },
      { name: "mat", change: 0 },
    ],
  },
  {
    id: 4,
    src: `${process.env.PUBLIC_URL + "./img/races/Ork.png"}`,
    name: "Ork",
    description: `Pochodzący z południowo-zachodnich stepów i dżungli kontynentu, Orki i gobliny to przede wszystkim wyśmienici łucznicy i jeźdźcy. Kiedy kilkaset lat temu pojawili się u rubieży ludzkich królestw, wszystkie pozostałe rasy szybko zrozumiały, że jeśli nie okiełznają tej dzikiej i naturalnej siły, ich świat może zostać poddany ciężkiej próbie. Każda z ras zabrała się za to rzecz jasna po swojemu, bez konsultacji z pozostałymi i bez jakiejkolwiek koordynacji - Elfy wysłały do przybyszów swoich dyplomatów, Ludzie - misjonarzy a Krasnoludy kupców. Efekt był taki, że Orki przejęły co przydatniejsze umiejętności, nie tracąc zarazem nic ze swojej dzikości. Z niezwykłą lubością napadają na podróżujące karawany kupieckie - zwłaszcza te, które świadome ryzyka podróżują do ich bardziej "ucywilizowanych" braci, misjonarze równie dobrze są obiektami uwielbienia wśród orkowych plemion, jak i stanowią przystawkę do upolowanej dziczyzny, a elficcy dyplomaci wciąż się uczą grzecznościowych zwrotów, po tym jak niejeden zapoznał się bliżej z wymyślnymi technikami torturowania jeńców. Generalnie proces asymilacji Orków trwa, ale z wielu różnych przyczyn idzie to trochę jak po grudzie.`,
    bonus: [
      { name: "str", change: 10 },
      { name: "agi", change: 0 },
      { name: "tough", change: 0 },
      { name: "vit", change: 0 },
      { name: "perc", change: 10 },
      { name: "int", change: -10 },
      { name: "speed", change: 5 },
      { name: "def", change: 10 },
      { name: "gold", change: 15 },
      { name: "wood", change: 3 },
      { name: "mat", change: 3 },
    ],
  },
];

export const SelectRace = () => {
  const getRaceFromDB = () => {
      return db.collection("races")
        .get()
        .then((race) => {
          const cards3 = race.docs.map((doc, i) => {
            return {
              id: i + 1,
              name: doc.id,
              src: `${
                process.env.PUBLIC_URL + "./img/races/" + `${doc.id}` + ".jpg"
              }`,
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
          return cards3
        });
  };

  console.log(getRaceFromDB());

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

  const uid = "tq0omzA0rZW9GQIloxiLQpCkfiL2";

  const updateRace = () => {
    const { name, bonus } = slides[1];
    const keys = [
      "str",
      "agi",
      "tough",
      "vit",
      "perc",
      "int",
      "speed",
      "def",
      "gold",
      "wood",
      "mat",
    ];
    db.collection("users")
      .doc(uid)
      .update({
        race: name,
        bonus: keys.reduce((result, key, index) => {
          result[key] = bonus[index].change;
          return result;
        }, {}),
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
    <>
      <button className="change__race" onClick={getPrevSlide}>
        {"<"}
      </button>
      <button className="change__race" onClick={getNextSlide}>
        {">"}
      </button>
      <div className="wrapper">
        <div className="slider">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={slide === slides[1] ? "selected" : "card"}
              style={{ backgroundImage: `url(${slide.src})` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="wrapper__desc">
        <h2 className="description race__name">{slides[1].name}</h2>
        <div className="description">{slides[1].description}</div>
        <div className="bonus bonus__title">Bonus rasowy:</div>
        <div className="bonus">
          {slides[1].bonus
            .filter((bonus) => bonus.change !== 0)
            .map((bonus) => (
              <div key={bonus.id}>
                {unitsMap[bonus.name]?.label || bonus.name}:{" "}
                {bonus.change > 0 ? "+" : ""}
                {bonus.change}
                {unitsMap[bonus.name]?.unit}
              </div>
            ))}
        </div>
        <div className="choose__race" onClick={updateRace}>
          Wybierz rasę: {slides[1].name}
        </div>
      </div>
    </>
  );
};
