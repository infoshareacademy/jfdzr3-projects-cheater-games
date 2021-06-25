import React from "react";
import { MainMenu } from "./MainMenu";
import { Link } from "react-router-dom";

export const HuntingScreen = () => {
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore
              </p>
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
