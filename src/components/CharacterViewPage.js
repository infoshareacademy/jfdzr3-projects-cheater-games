import s from "styled-components";
import { GlobalChat } from "../global-chat/global-chat";
import { db } from "../firebaseConfig";
import { useUser } from "../hooks/useUser";

const Wrapper = s.div`
padding: 20px;
display: flex;
flex-flow: column;
width: 100%;
height: 500px;
border: 1px solid black;
`;
const HeaderText = s.h2`
padding: 5px;
margin: 0 auto;
`;
const CharacterMainBax = s.div`
display: flex;
flex-flow: row;
width: 100%;
height: 95%;
background: tomato;
`;
const CharacterInformationBox = s.div`
width: 50%;
height: 100%;
background: yellow;
`;
const CharacterAvatarBox = s.div`
width: 50%;
height: 100%;
background: green;
`;

export const CharacterViewPage = () => {
  const checkRace = (uid) => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((race) => {
        console.log(race.name);
      });
  };

  checkRace();

  return (
    <>
      <Wrapper>
        <HeaderText>Widok postaci</HeaderText>
        <CharacterMainBax>
          <CharacterInformationBox />
          <CharacterAvatarBox></CharacterAvatarBox>
        </CharacterMainBax>
      </Wrapper>
      <GlobalChat />
    </>
  );
};
