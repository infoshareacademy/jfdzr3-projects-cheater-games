import { BasicItems } from "./BasicItems";
import { Item } from "./Item";
import { ItemGrid } from "./ItemGrid";
import { Items } from "./Items";
import { Test } from "./useItems.js";
import { useItems} from "./useItems";
import { Users } from "./Users";
export const StorePage = () => (
  <> 
    <h1>Mirek Handlarz</h1>
    <div style={{display: "flex"}}>
      {/* <Users /> */}
      {/* <ItemGrid>
      <Items />
      </ItemGrid> */}
        <ItemGrid>
      <Test />
      </ItemGrid>
      
      {/* <ItemGrid>
      <Item />
      </ItemGrid> */}
      {/* <ItemGrid>
        <BasicItems />
      </ItemGrid> */}
      {/* <ItemGrid>
        <UserItems />
      </ItemGrid> */}
    </div>
   
  </>
);
