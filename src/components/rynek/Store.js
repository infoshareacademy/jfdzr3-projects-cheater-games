import { Avatar } from "./Avatar";
import { CartInformation } from "./CartInformation";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { CartPage } from "./CartPage";
import { useModal } from "./hooks";
import { UserInventory } from "./UserInventory";
import { MerchantOffer } from "./MerchantOffer";
import { Chat } from "../global-chat/Chat";
import { SellPage } from "./SellPage";

const ModalWrapper = styled.section`
  min-width: 1100px;
  min-height: 800px;
`;
const CloseIconStyle = styled(CloseIcon)`
  font-size: large;
  width: 25px;
  height: 25px;
  float: right;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  margin: 12px 25px;
`;
const StoreWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 40% 20% 40%;
`;
const StoreScreen = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
  grid-template-rows: auto auto 200px;
  align-items: center;
  text-align: center;
  padding: 0 25px;
`;

export const Store = () => {
  const {
    isOpen,
    isSellPageOpen,
    openModal,
    closeModal,
    openSellPageModal,
    closeSellPageModal,
  } = useModal();

  if (isOpen === true) {
    return (
      <ModalWrapper >
        <CloseIconStyle onClick={closeModal} />
        <CartPage />
      </ModalWrapper>
    );
  } else if (isSellPageOpen === true) {
    return (
      <>
        {isSellPageOpen && (
          <ModalWrapper>
            <CloseIconStyle onClick={closeSellPageModal} />
            <SellPage />
          </ModalWrapper>
        )}
      </>
    );
  }

  return (
    <StoreScreen>
      <div>
        <h2>Mirek Handlarz</h2>
        <CartInformation
          openModal={openModal}
          openSellPageModal={openSellPageModal}
        />
      </div>
      <StoreWrapper>
        <UserInventory />
        <Avatar />
        <MerchantOffer />
      </StoreWrapper>
      <section>
        <Chat size="sm" />
      </section>
    </StoreScreen>
  );
};
