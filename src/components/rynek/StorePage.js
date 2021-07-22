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
import { CartItem } from "./CartItem";
import CloseIcon from '@material-ui/icons/Close';

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
const List = styled.ul`
  list-style: none;
  margin: 0 25px;
  `;
  const ItemCartStyle = styled.section`
  display: flex;
  height: max-content;
  width: "100%";
  justify-content: left;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  min-width: 95px;
  min-height: 120px;
  align-items: center;
  `;
  const CloseIconStyle = styled(CloseIcon)`
  font-size: large;
  width: 25px;
  height: 25px; 
  float: right;   
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5); 
  margin: 12px 25px;
  `

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
    console.log(cartItem);
    return joinItemWithCart(cartItem.key);
  });

  console.log(itemsToDisplayInCart);
  // const totalPrice = cart.reduce(
  //   (sum, cartItem) =>
  //     sum + cartItem.orderCount * joinItemWithCart(cartItem.key).val.value,
  //   0
  // );
  const totalCount = cart.reduce(
    (sum, cartItem) => sum + cartItem.orderCount,
    0
  );

  // const totalPrice = cart.reduce((sum, cartItem) =>sum + cartItem.orderCount * joinItemWithCart(cartItem.key).val.value ,0)
  //   const totalCount = cart.reduce(
  //     (sum, cartItem) => sum + cartItem.orderCount,
  //     0
  //   );
  const addToCart = (key) => {
    setCart((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.key === key);

      console.log(existingItem);
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

  const subtractFromCart = (key) => {
    setCart((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.key === key);
      console.log(existingItem);
      if (existingItem.orderCount > 1) {
        return cart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, orderCount: cartItem.orderCount - 1 }
            : cartItem
        );
      } else {
        return cart.filter((cartItem) => cartItem !== existingItem);
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
                orderCount={totalCount}
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
          <ModalWrapper >
            <CloseIconStyle 
            onClick={() => closeModal()}
            />
            <TextBlock>Koszyk</TextBlock>
            <List>
              {itemsToDisplayInCart.map((item, index) => {
                return (
                  <ItemCartStyle style={{ marginTop: "30px" }} >
                  <CartItem
                    key={index}
                    name={item.key}
                    orderCount={item.orderCount}
                    value={item.val.value}
                    icon={item.val.icon}
                    onAddButton={() => addToCart(item.key)}
                    onMinusButton={() => subtractFromCart(item.key)}
                  />
                   </ItemCartStyle>
                );
              })}
            </List>
          </ModalWrapper>
        )}
      </>
    );
  }
};
