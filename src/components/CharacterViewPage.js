import s from "styled-components";
import { db } from "../firebaseConfig";

const Wrapper = s.div`
padding: 20px;
display: flex;
flex-flow: column;
width: 1100px;
height: 300px;
border: 1px solid black;
`;
const HeaderText = s.h2`
margin: 0 auto;
`;
const CharacterMainBax = s.div`
width: 100%;
height: 80%;
background: tomato;

`;

export const CharacterViewPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderText>Widok postaci</HeaderText>
        <CharacterMainBax>asd</CharacterMainBax>
      </Wrapper>
    </>
  );
};
