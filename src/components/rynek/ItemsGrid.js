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
  // background-color: #f2f2f2;
  // background-image: url(https://firebasestorage.googleapis.com/v0/b/monster-hunt-v1.appspot.com/o/chat-background.jpg?alt=media&token=1cf27985-756a-4208-aec7-98b76944347a);
  // background-position: center;
  // background-size: 80%
`;

export const ItemsGrid = ({ text, children }) => (
  <ItemsWrapper >
    <TextBlock>{text}</TextBlock>
    {children}
  </ItemsWrapper>
);
