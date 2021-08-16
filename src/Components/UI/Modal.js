import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const modalClasses = props.isCheckout
    ? `${classes.modal} ${classes["checkout-modal"]}`
    : `${classes.modal} ${classes["nocheckout-modal"]}`;

  return (
    <div className={modalClasses}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlay"))}
      {ReactDOM.createPortal(
        <ModalOverlay isCheckout={props.isCheckout}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
