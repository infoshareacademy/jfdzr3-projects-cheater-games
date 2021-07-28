import s from "styled-components";
import { GlobalChat } from "../global-chat/global-chat";
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
display: flex;
justify-content: center;
padding-top: 50px;
width: 50%;
height: 100%;
background: green;
`;
const Image = s.img`
// width: 70%;
height: 70%`;
const MakeItBold = s.span`
font-weight: bold`;

export const CharacterViewPage = () => {
  const user = useUser();
  const checkRaceToSetAvatar = () => {
    if (user?.race === "Krasnolud") {
      return (
        <div>
          <p>
            Rasa: <MakeItBold>{user?.race}</MakeItBold>
          </p>
          <Image
            src={`${process.env.PUBLIC_URL}/img/races/Krasnolud.jpg`}
            alt="Krasnolud"
          />
        </div>
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

  return (
    <>
      <Wrapper>
        <HeaderText>Widok postaci</HeaderText>
        <CharacterMainBax>
          <CharacterInformationBox />
          <CharacterAvatarBox>{checkRaceToSetAvatar()}</CharacterAvatarBox>
        </CharacterMainBax>
      </Wrapper>
      <GlobalChat />
    </>
  );
};
