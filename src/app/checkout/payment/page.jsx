"use client";

import React, { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useShopContext } from "../../_context/ShopContext";
import CartNav from "../_checkoutComponent/CartNav";
import Cart from "../_checkoutComponent/Cart";
import DeliveryDetails from "../_checkoutComponent/DeliveryDetails";
import convertToCents from "../../../lib/convertToCents";
import { usePathname } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentAmount, currency, isCartLoaded } = useShopContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/payment/success`,
      },
      redirect: "if_required", // prevents double redirect
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // ✅ Clear cart here
      // clearCart();
      window.location.href = "/checkout/payment/success";
    } else {
      setErrorMessage("Payment could not be completed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <DeliveryDetails />
      {clientSecret && stripe && elements ? (
        <PaymentElement />
      ) : (
        <p>Loading Payment Method ....</p>
      )}

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <button
        type="submit"
        disabled={!stripe || !elements || loading || !clientSecret}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-300 active:scale-95 ${
          !stripe || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-hero text-white hover:bg-gradient-footer cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : `Pay ${currency}${paymentAmount}`}
      </button>
    </form>
  );
};

const Payment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const { paymentAmount } = useShopContext();
  const path = usePathname();

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: convertToCents(paymentAmount) }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    createPaymentIntent();
  }, [paymentAmount]);

  return (
    <div className="max-w-6xl mx-auto p-4 mb-30 min-h-[300px]">
      <CartNav path={path} />
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <CheckoutPaymentForm clientSecret={clientSecret} />
            </div>
            <div className="lg:col-span-1">
              <Cart />
            </div>
          </div>
        </Elements>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-gray-700 dark:text-white"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
