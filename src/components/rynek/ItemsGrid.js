import "./store.css";
import { TextBlock } from "./TextBlok";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  grid-auto-rows: 110px;
  grid-gap: 10px;
`;

export const ItemsGrid = ({ text, children }) => (
  <>
    <div className="items-wrapper">
      <TextBlock>{text}</TextBlock>
      <Wrapper className="items-grid">{children}</Wrapper>
    </div>
  </>
);
