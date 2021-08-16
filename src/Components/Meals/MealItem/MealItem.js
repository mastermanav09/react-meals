import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const item = {
      key: props.value.id,
      name: props.value.name,
      price: props.value.price,
      amount: amount,
    };

    cartContext.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div className={classes.mealimg}>
        <img src={props.value.imgUrl} alt="food-pic" />
      </div>

      <div>
        <h3>{props.value.name}</h3>
        <div className={classes.description}>{props.value.description}</div>
        <div className={classes.price}>Rs. {props.value.price}</div>
      </div>

      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
