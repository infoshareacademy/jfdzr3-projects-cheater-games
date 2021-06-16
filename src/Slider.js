import { useState } from "react";
import firebase from "firebase";
import firebaseApp from "./firebaseConfig.js"
// import dwarf from "../public/img/races/./dwarf.jpg";
// import "./styles.css";

// firebaseApp();

const cards = [
  {
    id: 1,
    src: `${process.env.PUBLIC_URL + './img/races/dwarf.jpg'}`,
    name: "Krasnoludy",
    description: `Uparty i zawzięty lud z gór. Ich legendy głoszą, że pewnego dnia bogowie zaprosili siedmiu najznamienitszych kowali i rzemieślników na wielką ucztę w górach, aby zachwycać się ich kunsztem. W trakcie uczty, zauroczeni bogowie zapragnęli jeszcze piękniejszych wyrobów i jeszcze znakomitszych dzieł. Dlatego do dziś Krasnoludy dążą do doskonałości. Ich upór i odwaga prowadzą ich do ciągłego rozwoju, co jednak nie przysparza im sympatii wśród pozostałych ras. Szczególnie Elfy mają ich za zarozumiałych, upartch jak osły gburów, których kuźnie i huty zatruwają dziewicze lasy górskich zboczy. Krasnoludy zazwyczaj nic sobie z tych pretensji nie robią - jak powiedział kiedyś jeden z krasnoludzki płócienników: "Zwisa im to i powiewa". Oczywiście olbrzymi rozwój metalurgii i kowalstwa sprawił, że krasnoludzka broń jest uznawana za najlepszą na świecie, a Krasnoludy za twardych i nieustępliwych wojowników. Również wydobyciem kruszców, zwłaszcza złota i rud metali, przewyższają nawet żyjących w górzystych terenach Ludzi.`,
    bonus: [
      { name: "Siła: ", change: "+5"},
      { name: "Wytrzymałość: ", change: "+10"},
      { name: "Żywotność: ", change: "+5"},
      { name: "Szybkość: ", change: "-10"},
      { name: "Obrona: ", change: "+15"},
      { name: "Przyrost złota: ", change: "+50/h"},
    ],
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL + './img/races/human.jpg'}`,
    name: "Ludzie",
    description: `Kiedy dokładnie pojawili się na Kontynencie i z jakiej konkretnej przyczyny, nie jest do końca wiadome nawet Elfom. Choć uzurpują sobie prawo do wiedzy o wszystkim co się dzieje na świecie, historia ludzkości, a przynajmniej jej początki, umykają nawet pradawnym pismom Elfów. Wiadomo jest za to, że ze swoją, raczej śmieszną, długością życia i pewną nerwowością w poczynaniach, to Ludzie (oprócz Krasnoludów) są główną siłą napędową postępu dokonującego się na świecie. Wszystko oczywiście ma swój koszt, więc Elfy z niepokojem patrzą na coraz silniejszy wpływ Ludzi na środowisko, rozwój ich miast, będących źródłem nieznanych wcześniej chorób, czy zmniejszających się powierzchni leśnych. Wraz z rozwojem ludzkiej wiedzy i umiejętności, kurczą się też legendy, Ludzie chcą wszystko wyjaśnić, zracjonalizować, dlatego bez ustanku polują na wszelkie przejawy "legendarnych zabobonów". Tym niemniej dzięki temu, Ludzie odznaczają się dużą sprawnością i odpornością na niespodziewane sytuacje.`,
    bonus: [
      { name: "Siła: ", change: "+5"},
      { name: "Wytrzymałość: ", change: "+5"},
      { name: "Żywotność: ", change: "+5"},
      { name: "Obrona: ", change: "+15"},
      { name: "Przyrost materiału: ", change: "+6/h"},
    ],
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL + './img/races/elf.jpg'}`,
    name: "Elfy",
    description: `Prawodpodobnie słusznie Elfy są uznawane za najmądrzejszą i najstarszą z ras zamieszkujących Kontynent. Ich wrodzona inteligencja i bystrość umysłu pozwalają im na unikanie wielu pułapek rozwijającego się świata. Wciąż stanowiąc nierozwiązaną zagadkę dla innych ras, Elfy usiłują żyć tak samo jak ich przodkowie przed tysiącami lat. Obdarzeni niezwykle długim życiem, są jednak bardziej podatni na nowe choroby, których wylęgarnie stanowią ciągle rozwijające się ludzkie miasta. W lesie potrafią poruszać się praktycznie bezszelestnie, błyskawicznie wynajdując optymalne ścieżki czy naturalne miejsca, w których mogą się schować lub zaczaić. Choć zdarza im się odwiedzać ludzkie miasta, to dla wielu Ludzi pozostają pewną zagadką. Krasnoludy z kolei traktują Elfy z chłodnym dystansem, co nie przeszkadza im regularnie wysyłać handlowych karawan na ich tereny.`,
    bonus: [
      { name: "Zwinność: ", change: "+5"},
      { name: "Inteligencja: ", change: "+10"},
      { name: "Spostrzegawczość: ", change: "+5"},
      { name: "Wytrzymałość: ", change: "-15"},
      { name: "Przyrost drewna: ", change: "+6/h"},
    ],
  },
  {
    id: 4,
    src: `${process.env.PUBLIC_URL + './img/races/orcs.png'}`,
    name: "Orki",
    description: `Pochodzący z południowo-zachodnich stepów i dżungli kontynentu, Orki i gobliny to przede wszystkim wyśmienici łucznicy i jeźdźcy. Kiedy kilkaset lat temu pojawili się u rubieży ludzkich królestw, wszystkie pozostałe rasy szybko zrozumiały, że jeśli nie okiełznają tej dzikiej i naturalnej siły, ich świat może zostać poddany ciężkiej próbie. Każda z ras zabrała się za to rzecz jasna po swojemu, bez konsultacji z pozostałymi i bez jakiejkolwiek koordynacji - Elfy wysłały do przybyszów swoich dyplomatów, Ludzie - misjonarzy a Krasnoludy kupców. Efekt był taki, że Orki przejęły co przydatniejsze umiejętności, nie tracąc zarazem nic ze swojej dzikości. Z niezwykłą lubością napadają na podróżujące karawany kupieckie - zwłaszcza te, które świadome ryzyka podróżują do ich bardziej "ucywilizowanych" braci, misjonarze równie dobrze są obiektami uwielbienia wśród orkowych plemion, jak i stanowią przystawkę do upolowanej dziczyzny, a elficcy dyplomaci wciąż się uczą grzecznościowych zwrotów, po tym jak niejeden zapoznał się bliżej z wymyślnymi technikami torturowania jeńców. Generalnie proces asymilacji Orków trwa, ale z wielu różnych przyczyn idzie to trochę jak po grudzie.`,
    bonus: [
      { name: "Siła: ", change: "+10"},
      { name: "Spostrzegawczość: ", change: "+10"},
      { name: "Szybkość: ", change: "+5"},
      { name: "Inteligencja: ", change: "-10"},
      { name: "Obrona: ", change: "+10"},
      { name: "Przyrost złota: ", change: "+15/h"},
      { name: "Przyrost drewna: ", change: "+3/h"},
      { name: "Przyrost złota: ", change: "+3/h"},
    ],
  }
];

const uid = "tq0omzA0rZW9GQIloxiLQpCkfiL2";

export const Slider = () => {
  const playerUID = "tq0omzA0rZW9GQIloxiLQpCkfiL2";

  const [currentSlide, setCurrentSlide] = useState(0);

  const getNextSlide = () => setCurrentSlide((old) => (old + 1) % cards.length);
  const getPrevSlide = () =>
    setCurrentSlide((old) => (old - 1 + cards.length) % cards.length);

  const slides = [...cards, ...cards, ...cards].slice(
    currentSlide + cards.length - 1,
    currentSlide + cards.length + 2
  );

  const db = firebase.firestore();
  // console.log(db.collection("users").doc(uid).get());

    const updateRace = () => {
      db.collection("users").doc(uid).update({
        // exp: exp,
        // name: name,
        // nextLevel: nextLevel,
        race: slides[1].name,
        bonus: slides[1].bonus
      })
    }

  return (
    <>
    <button onClick={getPrevSlide}>{"<"}</button>
      <button onClick={getNextSlide}>{">"}</button>
      <div className="wrapper">
      <div className="slider">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={slide === slides[1] ? "selected" : "card"}
            style={{ backgroundImage: `url(${slide.src})`}}
          >
          </div>
        ))}
      </div>
      </div>
      <div className="wrapper__desc">
      <h2 className="description race__name">{slides[1].name}</h2>
      <div className="description">{slides[1].description}</div>
      <div className="bonus bonus__title">Bonus rasowy:</div>
      <div className="bonus">{slides[1].bonus.map((bonus) => (
        <div key={bonus.id}>{bonus.name}{bonus.change}</div>
      ),
      )}
      </div>
      <div className="choose__race" onClick={updateRace}>Wybierz rasę: {slides[1].name}</div>
      </div>
    </>
  );
};