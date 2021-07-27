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
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { CartPage } from "./CartPage";

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
const CloseIconStyle = styled(CloseIcon)`
  font-size: large;
  width: 25px;
  height: 25px;
  float: right;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  margin: 12px 25px;
`;

export const StorePage = () => {
  const user = useUser();
  const itemsCollectionPath = useMemo(() => db.collection("items"), []);
  const userItemsCollectionPath = useMemo(
    () => db.collection("users").doc(user?.uid).collection("armory"),
    [user?.uid]
    );
  const itemsRef = useItems(itemsCollectionPath);
  // const userItemsRef = useUserItems(userItemsCollectionPath);
  const userItemsRef = useItems(userItemsCollectionPath);

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [userArmory, setUserArmory] = useState({});
  useEffect(() => {
    if (user !== null) {
      userItemsRef &&
        userItemsRef.map((userItem) => {
          if (userItem.type === "210701182001200") {
            const key = userItem.key;
            const { Prefix, Suffix, quality } = userItem.val;
            
            const getArmoryValue = () => {
              const armoryValue = itemsRef.find((item) => item.key === key);
            return {...armoryValue.val}
            };
console.log(itemsRef);

            const getHandWeaponSuffix = () => { 

             const handWeaponSuffix = itemsRef.filter((item)=> item.type === "handWeaponSuffix")
console.log(handWeaponSuffix);
             const suffix = handWeaponSuffix.find((el) => el.key === Suffix


              //  const suffixValue = item.suffix === Suffix
              // return {...suffixValue.value}
            );
            console.log(suffix);
            return {...suffix.val}
            }
            
            
            const handWeaponSuffixValue = getHandWeaponSuffix().value
            console.log(handWeaponSuffixValue);
            const armoryValue = getArmoryValue();
            setUserArmory({
              name: userItem.key,
              prefix: Prefix,
              suffix: Suffix,
              quality: quality,
              val: armoryValue,
              handWeaponSuffixValue: handWeaponSuffixValue

            });
          }
        });
    }
  }, []);


  const qualityDisplay = () => {
    if (userArmory.quality === 1) {
      return;
    } else if (userArmory.quality === 1.5) {
      return "Dobry";
    } else if (userArmory.quality === 2.5) {
      return "Doskonały";
    }
  };
  const displayingQuality = qualityDisplay();


  if (user !== null) {
    console.log(userArmory);
  }
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

  const totalCount = cart.reduce(
    (sum, cartItem) => sum + cartItem.orderCount,
    0
  );

  const totalPrice = cart.reduce(
    (sum, cartItem) =>
      sum + cartItem.orderCount * joinItemWithCart(cartItem.key).val.value,
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

  const resetCart = () => {
    setCart([]);
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
          <section>
            <GlobalChat />
          </section>
        </section>
      </>
    );
  } else {
    return (
      <>
        <ModalWrapper>
          <CloseIconStyle onClick={() => closeModal()} />

          <div>Masz mój miecz:</div>
          <div>Nazwa: <span>{displayingQuality} {userArmory.prefix} {userArmory.name} {userArmory.suffix}</span></div>
          {/* <div>Wartość przedmiotu: {userArmory.quality * (itemStats?.value + itemSuffix?.value + itemPrefix?.value)} golda</div> */}

          <CartPage
            itemsToDisplayInCart={itemsToDisplayInCart}
            subtractFromCart={subtractFromCart}
            addToCart={addToCart}
            totalPrice={totalPrice}
            resetCart={resetCart}
            userItemsRef={userItemsRef}
          />
        </ModalWrapper>
      </>
    );
  }
};
