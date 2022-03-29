import React from "react";
import "./Modal.css";

const Modal = ({ active, onClick, children }) => {
  return (
    <div
      className={active ? "modal-wrapper active" : "modal-wrapper"}
      onClick={() => onClick()}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
     >
        {children}
      </div>
    </div>
  );
};

export default Modal;