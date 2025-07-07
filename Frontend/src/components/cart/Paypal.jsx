import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal({ amount = "0.01", onSuccess = () => {}, onError = () => {} }) {
  return (
    <PayPalScriptProvider options={{ clientId: "ARt0Lg2UJmqQnBhUfSN4XtGIAi3AZzZ-G1gkvZkQ92ffefsTc9VuWVdnq3qRN306DwjPfqhzuCOHlKNM" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default Paypal;
