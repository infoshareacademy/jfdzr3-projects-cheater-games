import "./store.css";
import { Avatar } from "./Avatar";
import { Items } from "./Items";
import { ItemsGrid } from "./ItemsGrid";
import { useUser } from "../../hooks/useUser";
import { useItems } from "../../hooks/useItems";
import { db } from "../../firebaseConfig";
import { CartInformation } from "./CartInformation";
import { TextBlock } from "./TextBlock";
import { GlobalChat } from "../../global-chat/global-chat";
import { useState } from "react";
import styled from "styled-components";
import { ItemStyle } from "./Items";

const CartInfoWrapper = styled.div`
  display: flex;
  width: 40%;
  float: right;
  transform: scale3d(0.95, 0.95, 1);
  justify-content: space-between;
`;
const ModalWrapper = styled.section`
  min-width: 1100px;
  min-height: 800px;
  // display: grid;
  // grid-template-row: auto;
`;

export const StorePage = () => {
  const user = useUser();

  const itemsCollectionPath = db.collection("items");
  const userItemsCollectionPath = db
    .collection("users")
    .doc(user?.uid)
    .collection("armory");
  const itemsRef = useItems(itemsCollectionPath);
  // const userItemsRef = useUserItems(userItemsCollectionPath);
  const userItemsRef = useItems(userItemsCollectionPath);

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const joinItemWithCart = (key) => {
    const items = itemsRef.find((item) => item.key === key);
    const cartItem = cart.find((el) => el.key === key);

    return { ...items, ...cartItem };
  };

  const itemsToDisplayInCart = cart.map((cartItem) => {
    return joinItemWithCart(cartItem.key);
  });

  console.log(itemsToDisplayInCart);

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

  if (isOpen === false) {
    return (
      <>
        <section className="store__screen">
          <div>
            <h2>Mirek Handlarz</h2>
            <CartInfoWrapper>
              <TextBlock>Twoje złoto: {user?.resources.gold}</TextBlock>
              <CartInformation
                orderCount={orderCount}
                openModal={() => {
                  openModal(true);
                }}
              />
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
  } else {
    return (
      <>
        {itemsToDisplayInCart.length === 0 ? (
          <ModalWrapper onClick={() => closeModal()}>
            <TextBlock>Nie masz przedmiotów w koszyku</TextBlock>
          </ModalWrapper>
        ) : (
          <ModalWrapper onClick={() => closeModal()}>
            <TextBlock>Koszyk</TextBlock>
            <>
              {itemsToDisplayInCart.map((item, index) => {
                return (
                  <ItemStyle key={index} style={{ marginTop: "30px" }}>
                    <h2>{item.key}</h2>
                  </ItemStyle>
                );
              })}
            </>
          </ModalWrapper>
        )}
      </>
    );
  }
};
