import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router"; // ✅ Added navigate
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Featurers/Loading/Loading";
import useAuthContext from "../../../Hooks/useAuthContext";
import useTitle from "../../../Hooks/useTitle";

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
  const [Error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Added
  useTitle("Payment");
  const { id } = useParams();
  const { user } = useAuthContext();

  const AxiosSecure = useAxiosSecure();
  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />; // ✅ Fixed loading

  const Amount = parcelInfo.cost;
  const amountInCents = Amount * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error);
    } else {
      setError("");

      // Step 1: Create payment intent
      const res = await AxiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });
      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            parcelId: id,
            email: user.email,
            amount: Amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types?.[0],
          };

          const paymentRes = await AxiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            console.log("Payment recorded ✅");
            navigate("/dashboard/my-parcel"); // ✅ Redirects to refresh UI
          }
        }
      }
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
          Pay ${Amount}
        </button>
        {Error && <p className="text-sm text-red-500">{Error.message}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
