import "./store.css";
import { BasicItems } from "./BasicItems";
import { Item } from "./Item";
import { ItemGrid } from "./ItemGrid";
import { Items } from "./Items";
import { Test } from "./Test.js";
import { UserItems } from "./UserItems";

export const StorePage = () => (
  <>
    <h1>Mirek Handlarz</h1>
    <div className="store-wrapper">
      {/* <ItemGrid>
      <Items />
      </ItemGrid> */}
      <ItemGrid>
        <Test />
      </ItemGrid>

      {/* <ItemGrid>
      <Item />
      </ItemGrid> */}
      <ItemGrid>
        <BasicItems />
      </ItemGrid>
      <ItemGrid>
        <UserItems />
      </ItemGrid>
    </div>
  </>
);
