import { TextBlock } from "./TextBlock";

export const ItemGrid = ({ children }) => (
  <div className="items-wrapper"
    style={{
      display: "grid",
      width: "100%",
      border: "1px solid #e1984d",
      borderRadius: "3%",
      marginTop: "20px",
    }}
  >
    <TextBlock>For Sale</TextBlock>

    <div className="items-grid"
      style={{
        display: "grid",
        gridGap: 10,
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr)",
        // gridTemplateColumns: "repeat(4, 20%)",


        padding: "5px",
      }}
    >
      {children}
    </div>
  </div>
);
