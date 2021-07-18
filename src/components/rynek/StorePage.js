import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { useUserItems } from "../../hooks/useUserItems";
import { db } from "../../firebaseConfig";
import { CartInformation } from "./CartInformation";
import { TextBlock } from "./TextBlok";
import { GlobalChat } from "../../global-chat/global-chat";
import { useState } from "react";
import styled from "styled-components";
import { WidgetsTwoTone } from "@material-ui/icons";

const CartInfoWrapper = styled.div`
  display: flex;
  width: 40%;
  float: right;
  transform: scale3d(0.95, 0.95, 1);
  justify-content: space-between;
`;

export const StorePage = () => {
  const user = useUser();
  const itemsCollectionPath = db.collection("items");
  const userItemsCollectionPath = db
    .collection("users")
    .doc(user?.uid)
    .collection("armory");
  const itemsRef = useItems(itemsCollectionPath);
  const userItemsRef = useUserItems(userItemsCollectionPath);

  const [cart, setCart] = useState([]);

  const orderCount = cart.reduce(
    (sum, cartItem) => sum + cartItem.orderCount,
    0
  );

  const addToCart = (key) => {
    setCart((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.key === key);
      if (!existingItem) {
        return [...cart, { key, orderCount: 1 }];
      } else {
        return cart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, orderCount: cartItem.orderCount + 1 }
            : cartItem
        );
      }
    });
  };

  return (
    <>
      <section className="store__screen" style={{ margin: "0 auto" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Mirek Handlarz</h1>
          <CartInfoWrapper>
            <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock>
            <CartInformation orderCount={orderCount} />
          </CartInfoWrapper>
        </div>
        <div className="store-wrapper">
          <ItemsGrid text="Sprzedaj">
            <Items items={userItemsRef} />
          </ItemsGrid>
          <Avatar />
          <ItemsGrid text="Kup">
            <Items items={itemsRef} onBuyClick={(key) => addToCart(key)} />
          </ItemsGrid>
        </div>
        <section style={{ height: "250px" }}>
          <GlobalChat />
        </section>
      </section>
    </>
  );
};
