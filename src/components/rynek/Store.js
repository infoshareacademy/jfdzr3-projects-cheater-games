import { Avatar } from "./Avatar";

import { CartInformation } from "./CartInformation";
import { GlobalChat } from "../../components/global-chat/global-chat";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { CartPage } from "./CartPage";

import { useModal } from "./hooks";
import { UserInventory } from "./UserInventory";
import { MerchantOffer } from "./MerchantOffer";

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

export const Store = () => {
  const { isOpen, openModal, closeModal } = useModal();

  if (isOpen) {
    return (
      <ModalWrapper>
        <CloseIconStyle onClick={closeModal} />
        <CartPage />
      </ModalWrapper>
    );
  }

  return (
    <section className="store__screen">
      <div>
        <h2>Mirek Handlarz</h2>
        <CartInformation openModal={openModal} />
      </div>
      <div className="store-wrapper">
        <UserInventory />
        <Avatar />
        <MerchantOffer />
      </div>
      <section>
        <GlobalChat />
      </section>
    </section>
  );
};
