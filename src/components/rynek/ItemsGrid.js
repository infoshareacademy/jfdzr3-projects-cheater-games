import "./store.css";
import { TextBlock } from "./TextBlock";

export const ItemsGrid = ({ text, children }) => (
  <div className="items-wrapper">
    <TextBlock>{text}</TextBlock>
    {children}
  </div>
);
