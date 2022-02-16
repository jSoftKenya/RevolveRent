import React, { Component } from "react";
import CheckoutForm from "../pay/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_51IfY1JIF35gk66vlXrDMqscL7LLgEgqFL9wDCBp2xi8cSlPHvj5kBovvINjsgSypn2n4DT7eZc9o1vNxIJ4MWxy600DI0fRDcn");

export default class PaymentWraper extends Component {
  render() {
    return (
      <>
      <Elements stripe={stripePromise}>
        <CheckoutForm amountInShillings={this.props.amountInShillings} />
      </Elements>
      <div>Stripe Checkout</div>
      </>
    );
  }
}
