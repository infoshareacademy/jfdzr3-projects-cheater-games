import { Modal } from "./Modal";
import reactDom from "react-dom";
import "./Modal.css";

export const ModalController = ({ open, onClose, difficulty }) => {
  if (!open) return null;
  if (!difficulty) return null;
  return reactDom.createPortal(
    <>
      <div className="overlay"></div>
      <Modal onClose={onClose} difficulty={difficulty} />
    </>,
    document.getElementById("portal")
  );
};
