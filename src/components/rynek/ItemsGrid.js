import { TextBlock } from "./TextBlock";
import styled from "styled-components";

const ItemsWrapper = styled.div`
  display: grid;
  align-content: start;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  transform: scale3d(95%, 95%, 100%);
  overflow: scroll;
  min-height: 400px;
  max-height: 600px;
  background-color: #f2f2f2;
`;

export const ItemsGrid = ({ text, children }) => (
  <ItemsWrapper>
    <TextBlock>{text}</TextBlock>
    {children}
  </ItemsWrapper>
);
