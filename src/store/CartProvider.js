import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD-ITEM") {
    let updatedItems = [];
    let updatedTotalAmount;
    const existingItemIndex = state.items.findIndex(
      (it) => action.item.key === it.key
    );

    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];
      existingItem.amount += 1;

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = existingItem;
      //
      updatedTotalAmount = state.totalAmount + action.item.price;
    } else {
      updatedItems = state.items.concat(action.item); // it does not update the existing array rather it will return a new one.with the updated item.

      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE-ITEM") {
    const existingItemIndex = state.items.findIndex(
      (it) => action.id === it.key
    );

    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.key !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemtoCartHandler = (item) => {
    cartDispatch({
      type: "ADD-ITEM",
      item: item,
    });
  };
  const removeItemfromCartHandler = (id) => {
    cartDispatch({
      type: "REMOVE-ITEM",
      id: id,
    });
  };

  const clearCartHandler = () => {
    cartDispatch({
      type: "CLEAR",
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    removeItem: removeItemfromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
