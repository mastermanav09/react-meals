import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import classes from "../Cart/Cart.module.css";
import React, { useState } from "react";
import Loader from "../Loader/Loader";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "white",
      color: "white",
      backgroundColor: "#6996f7",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        setError(null);
        setDidSubmit(false);
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://uem24.sse.codesandbox.io/payment",
          {
            amount: props.totalAmount,
            id,
            itemsName: props.itemsName,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
    setIsSubmitting(false);
    setDidSubmit(true);

    if (!error) {
      props.orderHandler();
    }
  };

  let fadedLoadingClasses = "";
  if (isSubmitting) {
    fadedLoadingClasses = classes.fadedLoading;
  }

  return (
    <>
      <div>
        {isSubmitting && !didSubmit && (
          <div className={fadedLoadingClasses}>
            <Loader />
          </div>
        )}
        {
          <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className={classes["pay-btn"]} type="submit">
              Pay
            </button>
          </form>
        }
      </div>
      {error && !success && didSubmit && (
        <div className={classes.error}>Request Failed : {error}</div>
      )}
    </>
  );
}
