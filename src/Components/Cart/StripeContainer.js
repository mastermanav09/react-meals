import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51IeORPSBGBLi9EL1xXwz712lTr6DpjWinVyzGqjxBVTC3B1tEC9XqTMOrGvRpBjEql9tqHc8l7tLQ1h02uiuRkxo008eX1pPwX";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        itemsName={props.itemsName}
        orderHandler={props.orderHandler}
        totalAmount={props.totalAmount}
      />
    </Elements>
  );
};

export default StripeContainer;
