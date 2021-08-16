import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../UI/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);

  const { items } = cartContext;
  const totalCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${
    buttonIsHighlighted ? styles.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const key = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    setButtonIsHighlighted(true);

    return () => {
      clearTimeout(key);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
