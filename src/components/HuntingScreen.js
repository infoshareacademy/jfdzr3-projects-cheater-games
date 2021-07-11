import React, { useState } from "react";
import { Link } from "react-router-dom";
import HoverImage from "react-hover-image";

const description = [
  {
    name: "Łatwy",
    descript: `Praesent ac odio ut nulla semper faucibus. Nam vel molestie lorem.
    Curabitur vulputate viverra pretium. Suspendisse velit ipsum, dapibus vitae
    blandit et, porta eget libero.Pellentesque eros mi, tincidunt ac suscipit eget, congue ut libero.`,
  },
  {
    name: "Średni",
    descript: `Ut lobortis eleifend arcu, sed ornare mi molestie varius. Sed vel facilisis mi,
    non hendrerit arcu. Ut scelerisque, diam ut gravida convallis,
    ligula arcu laoreet dui, laoreet malesuada ex turpis quis sem.Mauris vitae massa eu tortor
    olutpat cursus ut auctor quam.
    Proin nisl tellus, venenatis non magna in, eleifend dapibus ipsum.Nullam eget elementum turpis.`,
  },
  {
    name: "Trudny",
    descript: `unc imperdiet auctor dapibus. Suspendisse dolor metus, efficitur ac diam eget, porttitor 
    pellentesque justo.Donec in posuere turpis.Ut non ligula nunc.Mauris mollis ipsum ornare dolor pulvinar vulputate.V
    estibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Nullam lorem nisi, pretium sit amet sem et,
    sodales sodales mauris.`,
  },
];

export const HuntingScreen = () => {
  const [currentLevelId, setCurrentLevel] = useState("");
  const currentLevel = description.find((desc) => desc.name === currentLevelId);

  const ifEmpty = () => {
    if (currentLevel === undefined) {
      return (
        <p style={{ color: "red", fontSize: "20px" }}>
          Wybierz poziom trudności polowania wojowniku!
        </p>
      );
    } else {
      return <p> {currentLevel.descript}</p>;
    }
  };
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
            <h3>Poziom trudności: </h3>
            <div className="hunting__screen--choose_level">
              {description.map((desc) => (
                <label>
                  {desc.name}
                  <input
                    type="radio"
                    name="level"
                    key={desc.name}
                    onClick={() => setCurrentLevel(desc.name)}
                  ></input>
                </label>
              ))}
            </div>
            <div className="hunting__screen--level_description">
              <div>{ifEmpty()}</div>
            </div>
            <div>
              <h3>Wybierz ścieżkę polowania</h3>
              <div className="hunting__screen--choose_ways">
                <Link to="/">
                  <HoverImage
                    src={
                      `${process.env.PUBLIC_URL}/img/arrows/left-arrow.png`
                    }
                    hoverSrc={
                      `${process.env.PUBLIC_URL}/img/arrows/left-arrow-hover.png`
                    }
                    style={{ height: "70px", width: "70px" }}
                  />
                </Link>
                <Link to="/">
                  <HoverImage
                    src={
                      `${process.env.PUBLIC_URL}img/arrows/up-arrow.png`
                    }
                    hoverSrc={
                      `${process.env.PUBLIC_URL}/img/arrows/up-arrow-hover.png`
                    }
                    style={{ height: "70px", width: "70px" }}
                  />
                </Link>
                <Link to="/">
                  <HoverImage
                    src={
                      `${process.env.PUBLIC_URL}/img/arrows/right-arrow.png`
                    }
                    hoverSrc={
                      `${process.env.PUBLIC_URL}/img/arrows/right-arrow-hover.png`
                    }
                    style={{ height: "70px", width: "70px" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
