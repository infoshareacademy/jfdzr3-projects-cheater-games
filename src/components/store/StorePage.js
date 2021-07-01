import { BasicItems } from "./BasicItems";
import { ItemGrid } from "./ItemGrid";
import { UserItems } from "./UserItems";
import { Users } from "./Users";
export const StorePage = () => (
  <>
    <h1>Mirek Handlarz</h1>
    <div style={{display: "flex"}}>
      <Users />
      {/* <ItemGrid>
        <BasicItems />
      </ItemGrid>
      <ItemGrid>
        <UserItems />
      </ItemGrid> */}
    </div>
   
  </>
);
