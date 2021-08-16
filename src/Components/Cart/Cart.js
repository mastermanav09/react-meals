import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Loader from "../Loader/Loader";
import StripeContainer from "./StripeContainer";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartContext = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [stripePayment, setStripePayment] = useState(false);
  const [addressSubmit, setAddressSubmit] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);
  const [userData, setUserData] = useState(null);

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };

  const checkoutHandler = () => {
    setStripePayment(true);
    setIsCheckout(true);
  };

  let itemsName = "";

  itemsName = cartContext.items.map((item) => item.name.toString());
  const totalAmount = cartContext.totalAmount.toFixed(2);
  const hasItems = cartContext.items.length > 0;

  const orderHandler = async (token) => {
    setIsSubmitting(true);
    setDidSubmit(false);
    setStripePayment(true);

    try {
      setError(null);

      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_KEY}/orders.json`,
        {
          method: "POST",
          body: JSON.stringify({
            userData: userData,
            orderedItems: cartContext.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsPaymentSuccessful(true);
      cartContext.clearCart();
    } catch (error) {
      setError(error.message || "Something went wrong");
      setIsPaymentSuccessful(false);
    }

    setStripePayment(false);
    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const submitUserData = (userData) => {
    setUserData(userData);
    setAddressSubmit(true);
  };

  const cartItems = (
    <ul
      className={`${classes["cart-items"]}  ${
        !hasItems ? classes["no-item-scrollHide"] : ""
      }`}
    >
      {cartContext.items.map((item) => (
        <CartItem
          key={item.key}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.key)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  var finalOrderconfirmContent;

  if (isCheckout) {
    finalOrderconfirmContent = (
      <Checkout onConfirm={submitUserData} onHideCart={props.onHideCart} />
    );
  } else {
    finalOrderconfirmContent = (
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={checkoutHandler}>
            Order
          </button>
        )}
      </div>
    );
  }

  const cartModalContent = (
    <>
      {!stripePayment && cartItems}

      {hasItems ? (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>Rs. {totalAmount}</span>
        </div>
      ) : (
        <p className={classes["empty_cart__text"]}>Your Cart is empty.😥</p>
      )}

      {finalOrderconfirmContent}
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart} isCheckout={isCheckout}>
      {isSubmitting && <Loader />}
      {!isSubmitting && !didSubmit && !addressSubmit && cartModalContent}
      {didSubmit && !stripePayment && isPaymentSuccessful && (
        <>
          <p className={classes["empty_cart__text"]}>
            Your order has been confirmed
          </p>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
          </div>
        </>
      )}

      {!isPaymentSuccessful && didSubmit && error && (
        <div className={classes.error}>{error}</div>
      )}
      {addressSubmit && !isSubmitting && !didSubmit && (
        <div className={classes.payment}>
          <strong>Payment</strong>
          <hr
            style={{
              width: "100%",
              marginBottom: "0.8rem",
            }}
          />
          <StripeContainer
            itemsName={itemsName}
            orderHandler={orderHandler}
            totalAmount={totalAmount}
          />
          <button className={classes["payment-btn"]} onClick={props.onHideCart}>
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
