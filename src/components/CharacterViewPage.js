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
// background: tomato;
`;
const CharacterInformationBox = s.div`
width: 50%;
height: 100%;
display:flex;
justify-content: center;
`;
const CharacterAvatarBox = s.div`
width: 50%;
height: 100%;
// background: green;
`;
const AvatarBoxContainer = s.div`
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`;
const Image = s.img`
margin-top: 20px;
height: 70%;
// object-fit: contain;
border-radius: 50% 50% 50% 50%;
`;

const RaceInformationText = s.p`
font-size: 1.2rem;
margin: 5px;
`;

const SecondWrapper = s.div`
height: 100%;
width: 50%;
// background: yellow;
justify-content: center;
display: flex;
flex-flow: column;`;

const Stats = s.div`
padding: 10px
`;
const StatsNameBolder = s.p`
font-weight: bold
`;

export const CharacterViewPage = () => {
  const user = useUser();
  const checkRaceToSetAvatar = () => {
    if (user?.race === "Krasnolud") {
      return (
        <AvatarBoxContainer>
          <Image
            src={`${process.env.PUBLIC_URL}/img/races/Krasnolud.jpg`}
            alt="Krasnolud"
          />
          <RaceInformationText>
            <h3>{user?.name}</h3>
          </RaceInformationText>
          <RaceInformationText>
            <h3>{user?.race}</h3>
          </RaceInformationText>
        </AvatarBoxContainer>
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
          <CharacterInformationBox>
            <SecondWrapper>
              <Stats>
                <StatsNameBolder>
                  Poziom: <span>{user?.level}</span>
                </StatsNameBolder>

                <StatsNameBolder>
                  Zdobyte doświadczenie: <span>{user?.exp}</span>
                </StatsNameBolder>
              </Stats>

              <Stats>
                <h3>Materiały:</h3>
                <StatsNameBolder>
                  Złoto: <span>{user?.resources.gold}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Drewno: <span>{user?.resources.wood}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Materiały: <span>{user?.resources.material}</span>
                </StatsNameBolder>
              </Stats>

              <Stats>
                <h3>Statystyki</h3>
                <StatsNameBolder>
                  Zręczność: <span>{user?.stats.agi}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Inteligencja: <span>{user?.stats.int}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Spostrzegawczość: <span>{user?.stats.perc}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Szybkość: <span>{user?.stats.speed}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Siła: <span>{user?.stats.str}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Wytrzymałość: <span>{user?.stats.tough}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Żywotność: <span>{user?.stats.vit}</span>
                </StatsNameBolder>
                <StatsNameBolder>
                  Pozotało do rozdzielenia: <span>{user?.stats.left}</span>
                </StatsNameBolder>
              </Stats>
            </SecondWrapper>
          </CharacterInformationBox>
          <CharacterAvatarBox>{checkRaceToSetAvatar()}</CharacterAvatarBox>
        </CharacterMainBax>
      </Wrapper>
      <GlobalChat />
    </>
  );
};
