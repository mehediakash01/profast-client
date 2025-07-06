import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a202c",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
const [Error,setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
     setError(error);
    } else {
        setError('');
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Pay for the Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded p-3">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary/80 text-black  py-2 px-4 rounded hover:bg-primary disabled:opacity-50"
        >
          Pay for the parcel
        </button>
        {
            Error&& <p className="text-sm text-red-500">{Error.message}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
