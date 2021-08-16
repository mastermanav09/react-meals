import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submithandler = (event) => {
    event.preventDefault();

    const enteredAmount = Number(amountInputRef.current.value);

    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  const validInput = () => {
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submithandler} noValidate>
      <Input
        onFocus={validInput}
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && (
        <p
          style={{
            color: "red",
            marginTop: "0.5rem",
            textAlign: "left",
            fontSize: "0.95rem",
          }}
        >
          Please enter a valid amount (1-5).
        </p>
      )}
    </form>
  );
};

export default MealItemForm;
