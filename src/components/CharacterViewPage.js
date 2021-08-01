import s from "styled-components";
import { GlobalChat } from "../global-chat/global-chat";
import { useUser } from "../hooks/useUser";
import { PropTypes } from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";

const Wrapper = s.div`
padding: 20px;
display: flex;
flex-flow: column;
width: 100%;
height: 500px;
border: 1px solid black;
`;

const CharacterMainBax = s.div`
display: flex;
flex-flow: row;
justify-contenet: center;
align-items: center;
height: 95%;
`;
const CharacterNameAndStatsBox = s.div`
display: flex;
flex-flow: column;
justify-content: center;
text-align: center;
height: 100%;
width: 50%;
`;

const CharacterInformationBox = s.div`
display:flex;
flex-flow: column;
justify-content: center;
text-align: center;
width: 50%;
height: 100%;
// background: tomato;
`;

const CharacterAvatarBox = s.div`
display: flex;
justify-contenet: center;
alightn-items: center;
width: 50%;
height: 100%;
// background: red;
`;
const Image = s.img`
margin: auto;
height: 70%;
box-shadow: 10px -10px 10px #a8a8a8;`;

export const CharacterViewPage = () => {
  const user = useUser();
  const checkRaceToSetAvatar = () => {
    if (user?.race === "Krasnolud") {
      return (
        <Image
          src={`${process.env.PUBLIC_URL}/img/races/Krasnolud.jpg`}
          alt="Krasnolud"
        />
      );
    }
    if (user?.race === "Elf") {
      return (
        <Image src={`${process.env.PUBLIC_URL}/img/races/Elf.jpg`} alt="Elf" />
      );
    }
    if (user?.race === "Człowiek") {
      return (
        <Image
          src={`${process.env.PUBLIC_URL}/img/races/Człowiek.jpg`}
          alt="Człowiek"
        />
      );
    }
    if (user?.race === "Ork") {
      return (
        <Image src={`${process.env.PUBLIC_URL}/img/races/Ork.jpg`} alt="Ork" />
      );
    }
  };

  function CircularProgressWithLabel(props) {
    return (
      <>
        <p>Zdobyte doświadczenie:</p>
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" size="70px" {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="#00695f">
              {`${user?.exp}XP`}
            </Typography>
          </Box>
        </Box>
      </>
    );
  }
  CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const CirculatStatistic = () => {
    const [progress, setProgress] = useState(10);
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return <CircularProgressWithLabel value={progress} />;
  };
  return (
    <>
      <Wrapper>
        <h2 className="character-overview-text">Widok postaci</h2>
        <CharacterMainBax>
          <CharacterInformationBox>
            <div className="materials-information">
              <h2>Surowce:</h2>
              <p>Złoto: {user?.resources.gold}</p>
              <p>Drewno: {user?.resources.wood}</p>
              <p>Materiały: {user?.resources.material}</p>
            </div>

            <div>
              <h2>Statystyki</h2>
              <p>Zręczność: {user?.stats.agi}</p>
              <p>Inteligencja: {user?.stats.int}</p>
              <p>Spostrzegawczość: {user?.stats.perc}</p>
              <p>Szybkość: {user?.stats.speed}</p>
              <p>Siła: {user?.stats.str}</p>
              <p>Wytrzymałość: {user?.stats.tough}</p>
              <p>Żywotność: {user?.stats.vit}</p>
            </div>
          </CharacterInformationBox>
          <CharacterAvatarBox>{checkRaceToSetAvatar()}</CharacterAvatarBox>
          <CharacterNameAndStatsBox>
            <div className="player-information">
              <p>
                <h2>{user?.name}</h2>
              </p>
              <p>
                <h4>{user?.race}</h4>
              </p>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>Poziom: </span>
                <span style={{ fontSize: "1.3rem" }}>{user?.level}</span>
              </p>
              <CirculatStatistic />
            </div>
          </CharacterNameAndStatsBox>
        </CharacterMainBax>
      </Wrapper>
      <GlobalChat />
    </>
  );
};
