import React, { useState } from "react";
import { Link } from "react-router-dom";

const description = [
  {
    id: 1,
    name: "easy",
    desc: "Praesent ac odio ut nulla semper faucibus. Nam vel molestie lorem. Curabitur vulputate viverra pretium. Suspendisse velit ipsum, dapibus vitae blandit et, porta eget libero. Pellentesque eros mi, tincidunt ac suscipit eget, congue ut libero.",
  },
  {
    id: 2,
    name: "mid",
    desc: `Ut lobortis eleifend arcu, sed ornare mi molestie varius. Sed vel facilisis mi, non hendrerit arcu. Ut scelerisque, diam ut gravida convallis, 
    ligula arcu laoreet dui, laoreet malesuada ex turpis quis sem.Mauris vitae massa eu tortor volutpat cursus ut auctor quam.
    Proin nisl tellus, venenatis non magna in, eleifend dapibus ipsum.Nullam eget elementum turpis.`,
  },
  {
    id: 3,
    name: "hard",
    desc: `unc imperdiet auctor dapibus. Suspendisse dolor metus, efficitur ac diam eget, porttitor 
    pellentesque justo.Donec in posuere turpis.Ut non ligula nunc.Mauris mollis ipsum ornare dolor pulvinar vulputate.V
    estibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam lorem nisi, pretium sit amet sem et,
    sodales sodales mauris.`,
  },
];

export const HuntingScreen = () => {
  const [currentLevelId, setCurrentLevel] = useState("easy");
  const currentLevel = description.find((desc) => desc.id === currentLevel);
  return (
    <>
      <div className="content">
        <main className="main__section">
          <div className="hunting__screen-title">
            <h2>Polowanie</h2>
          </div>
          <div className="hunting__screen-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="hunting__screen-main">
            <h4>Poziom trudności: </h4>
            <div className="hunting__screen--choose_level">
              <label>
                Łatwy
                <input type="radio" name="level" value="easy" />
              </label>
              <label>
                Średni
                <input type="radio" name="level" value="mid" />
              </label>
              <label>
                Trudny
                <input type="radio" name="level" value="hard" />
              </label>
            </div>
            <div className="hunting__screen--level_description">
              <h3>Idź na polowanie</h3>
              <p>{currentLevel}</p>
            </div>
            <div className="hunting__screen--choose_ways">
              <Link to="/">LEWO</Link>
              <Link to="/">W GÓRĘ</Link>
              <Link to="/">W PRAWO</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
