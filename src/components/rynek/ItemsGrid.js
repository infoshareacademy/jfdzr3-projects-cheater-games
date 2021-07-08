import "./store.css";
import { TextBlock } from "./TextBlok";

// export const ItemsGrid = ({ text, children }) => (
//   <div className="items-wrapper wrapper">
//     <TextBlock>{text}</TextBlock>
//     <div className="items-grid">{children}</div>
//   </div>
// );

export const ItemsGrid = ({ text, children }) => (
  <div className="items-wrapper git s">
    <TextBlock>{text}</TextBlock>
    <div className="items-grid">{children}</div>
  </div>
);
