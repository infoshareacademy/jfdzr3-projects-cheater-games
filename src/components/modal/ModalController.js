import { Modal } from "./Modal";
import reactDom from "react-dom";

export const ModalController = ({ open, onClose }) => {
  if (!open) return null;
  return reactDom.createPortal(
    <>
      <div className="overlay"></div>
      <Modal onClose={onClose} />
    </>,
    document.getElementById("portal")
  );
};
