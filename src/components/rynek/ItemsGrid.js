
import { TextBlock } from "./TextBlok"

export const ItemsGrid = ({ text, children }) => (
  <div className="items-wrapper">
    <TextBlock>{text}</TextBlock>
    <div className="items-grid">{children}</div>
  </div>
);
