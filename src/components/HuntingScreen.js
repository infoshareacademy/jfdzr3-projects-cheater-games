import React from "react";

export const HuntingScreen = () => {
  return (
    <>
      <div className="hunting_screen">
        <div className="hunting_screen-title">
          <h2>Polowanie</h2>
        </div>
        <div className="hunting_screen-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="hunting_screen-main">
          <p>Poziom trudności: </p>
          <div className="hunting_screen--choose_level">
            <input type="radio" name="level" value="easy" />
            <label>Łatwy</label>
            <input type="radio" name="level" value="mid" />
            <label>Średni</label>
            <input type="radio" name="level" value="hard" />
            <label>Trudny</label>
          </div>
          <div className="hunting_screen--level_description">
            <h3>Idź na polowanie</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
          </div>
          <div className="hunting_screen--choose_ways">
            <a href="#">LEWO</a>
            <a href="#">W GÓRĘ</a>
            <a href="#">W PRAWO</a>
          </div>
        </div>
      </div>
    </>
  );
};
