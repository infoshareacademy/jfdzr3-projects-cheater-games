import "./store.css";
import { TextBlock } from "./TextBlok";

// export const ItemsGrid = ({ text, children }) => (
//   <div className="items-wrapper wrapper">
//     <TextBlock>{text}</TextBlock>
//     <div className="items-grid">{children}</div>
//   </div>
// );
import styled from 'styled-components'
const Wrapper = styled.div`
display: grid;
justify-content: space-around;
align-items: flex-start;
grid-gap: 3px;

width: 100%;
grid-template-columns: repeat(4, 20%);
grid-template-rows: repeat(3, 33%) ;

`
export const ItemsGrid = ({ text, children }) => (
   <> 
  <div className="items-wrapper">
   <TextBlock>{text}</TextBlock>
    <Wrapper className="items-grid">{children}</Wrapper>
  </div>
  </>
);
