import { BasicItems } from "./BasicItems";
import { ItemGrid } from "./ItemGrid";
import { UserItems } from "./UserItems";

export const StorePage = () => (
  <>
    <h1>Mirek Handlarz</h1>
    <div style={{display: "flex"}}>
      <ItemGrid>
        <BasicItems />
      </ItemGrid>
      <ItemGrid>
        <UserItems />
      </ItemGrid>
    </div>
   
  </>
);
