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
import { useUser, SignInButton } from "@clerk/nextjs"; // ✅ get Clerk user
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPaymentForm = ({ clientSecret, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentAmount, currency, clearCart } = useShopContext();
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
        return_url: `${window.location.origin}/checkout/payment/success?orderId=${orderId}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // optional: you can clear cart immediately here if you want
      clearCart();
      window.location.href = `/checkout/payment/success?orderId=${orderId}`;
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
  const [orderId, setOrderId] = useState(null); // ✅ store orderId
  const { paymentAmount, cartItems } = useShopContext();
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user) return;

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertToCents(paymentAmount),
          cartItems,
          userId: user.id,
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId); // ✅ get orderId from backend
    };

    createPaymentIntent();
  }, [paymentAmount, cartItems, user]);

  return (
    <div className="max-w-6xl mx-auto p-4 mb-30 min-h-[300px]">
      <CartNav path={path} />
      {!user ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            You must be signed in to proceed to checkout
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to continue with your payment.
          </p>
          <SignInButton mode="page" redirecturl={window.location.href}>
            <button className="px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </div>
      ) : clientSecret && orderId ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <CheckoutPaymentForm
                clientSecret={clientSecret}
                orderId={orderId}
              />
            </div>
            <div className="lg:col-span-1">
              <Cart />
            </div>
          </div>
        </Elements>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-gray-700"
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
