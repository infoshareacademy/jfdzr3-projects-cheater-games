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
justify-content: space-between;
align-items: flex-start;
// grid-gap: 3px;

width: 100%;
grid-template-columns: repeat(4, 20%);
border: 1px solid gray;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`
export const ItemsGrid = ({ text, children }) => (
   <> 
  <div className="items-wrapper">
   <TextBlock>{text}</TextBlock>
    <Wrapper className="items-grid">{children}</Wrapper>
  </div>
  </>
);
