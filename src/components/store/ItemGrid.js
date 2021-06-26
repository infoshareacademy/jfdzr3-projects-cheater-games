import { TextBlock } from "./TextBlock";

export const ItemGrid = ({ children }) => (
  <div
    style={{
      display: "grid",
      width: "50%",
      border: "1px solid #e1984d",
      borderRadius: "3%",
      marginTop: "20px",
    }}
  >
    <TextBlock>For Sale</TextBlock>

    <div
      style={{
        display: "grid",
        gridGap: 10,
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr)",
        padding: "5px",
      }}
    >
      {children}
    </div>
  </div>
);
