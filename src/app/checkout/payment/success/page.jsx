"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useShopContext } from "../../../_context/ShopContext";
import Link from "next/link";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const { clearCart, paymentAmount, currency } = useShopContext();
  const [status, setStatus] = useState("processing"); // processing | success | failed

  useEffect(() => {
    if (!searchParams) return;
    const paymentIntentId = searchParams.get("payment_intent");
    if (!paymentIntentId) {
      setStatus("failed");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_intent: paymentIntentId }),
        });

        const data = await res.json();

        if (data.status === "succeeded") {
          clearCart();
          setStatus("success");
          clearInterval(interval);
        } else if (data.status === "requires_payment_method") {
          setStatus("failed");
          clearInterval(interval);
        } else {
          setStatus("processing"); // still pending
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("failed");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [searchParams, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center p-4">
      {status === "processing" && (
        <>
          <p className="text-gray-700 text-lg">Payment is processing...</p>
          <p className="text-gray-500 text-sm">Please do not close this tab.</p>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">
            Payment of {currency}
            {paymentAmount} is Successful 🎉
          </h1>
          <p className="text-gray-700 mt-2">Thank you for your order!</p>
          <Link href="/collection">
            <button className="mt-4 bg-gradient-hero text-white px-6 py-3 rounded-lg font-medium hover:bg-gradient-footer transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">
            Payment failed. ❌
          </h1>
          <p className="text-gray-700 mt-2">Please try again.</p>
          <Link href="/checkout">
            <button className="mt-4 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300">
              Retry Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
