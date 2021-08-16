import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const initialFormState = {
  name: true,
  mobNo: true,
  address: true,
  city: true,
  state: true,
};

function Checkout(props) {
  const [formState, setFormState] = useState(initialFormState);

  const enteredName = useRef();
  const enteredMobileNo = useRef();
  const enteredAddress = useRef();
  const enteredCity = useRef();
  const enteredState = useRef();

  const isNotEmpty = (value) => value.trim() !== "";
  const isTenNum = (num) => num.length === 10;
  const startsValid = (mobNum) => {
    mobNum = Number(mobNum);

    let numReg = /^[6-9]\d{9}$/;
    if (numReg.test(mobNum)) {
      return true;
    } else {
      return false;
    }
  };

  const reset = () => {
    enteredName.current.value = "";
    enteredMobileNo.current.value = "";
    enteredAddress.current.value = "";
    enteredCity.current.value = "";
    enteredState.current.value = "";

    setFormState(initialFormState);
  };

  let formIsValid = false;

  const orderConfirmHandler = (event) => {
    event.preventDefault();

    const nameIsValid = isNotEmpty(enteredName.current.value);
    const mobNoIsValid =
      isTenNum(enteredMobileNo.current.value) &&
      startsValid(enteredMobileNo.current.value);
    const addressIsValid = isNotEmpty(enteredAddress.current.value);
    const cityIsValid = isNotEmpty(enteredCity.current.value);
    const stateIsValid = isNotEmpty(enteredState.current.value);

    setFormState({
      name: nameIsValid,
      mobNo: mobNoIsValid,
      address: addressIsValid,
      city: cityIsValid,
      state: stateIsValid,
    });

    if (
      nameIsValid &&
      mobNoIsValid &&
      cityIsValid &&
      addressIsValid &&
      stateIsValid
    ) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName.current.value,
      address: enteredAddress.current.value,
      mobileNo: enteredMobileNo.current.value,
      city: enteredCity.current.value,
      state: enteredState.current.value,
    });

    reset();
  };

  const nameErrorInputClasses = formState.name ? "" : classes.invalid;
  const mobNoErrorInputClasses = formState.mobNo ? "" : classes.invalid;
  const addressErrorInputClasses = formState.address ? "" : classes.invalid;
  const cityErrorInputClasses = formState.city ? "" : classes.invalid;
  const stateErrorInputClasses = formState.state ? "" : classes.invalid;

  return (
    <form className={classes.form} onSubmit={orderConfirmHandler}>
      <div className={classes["group-control"]}>
        <div className={classes["form-control"]}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            ref={enteredName}
            className={nameErrorInputClasses}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="mobNo">Mobile Number</label>
          <input
            type="number"
            id="mobNo"
            ref={enteredMobileNo}
            className={mobNoErrorInputClasses}
          />
        </div>
      </div>

      <div className={classes["group-control"]}>
        <div className={classes["form-control"]}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            ref={enteredAddress}
            className={addressErrorInputClasses}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            ref={enteredCity}
            className={cityErrorInputClasses}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            ref={enteredState}
            className={stateErrorInputClasses}
          />
        </div>
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onHideCart}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
