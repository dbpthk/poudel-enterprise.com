"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useShopContext } from "../../../_context/ShopContext";
import Link from "next/link";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const { clearCart } = useShopContext();
  const [status, setStatus] = useState("processing"); // processing | success | failed
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (!orderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();

        setOrder(data);

        if (data.status === "paid") {
          clearInterval(interval);
          clearCart();
          setStatus("success");
        } else if (data.status === "failed") {
          clearInterval(interval);
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
        setStatus("failed");
      }
    }, 3000); // check every 3s

    return () => clearInterval(interval);
  }, [searchParams, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
      {status === "processing" && (
        <>
          <p className="text-gray-700 text-lg">Payment is processing...</p>
          <p className="text-gray-500 text-sm">Please do not close this tab.</p>
        </>
      )}

      {status === "success" && order && (
        <>
          <h1 className="text-2xl font-bold text-green-600">
            Payment of ${(order.amount / 100).toFixed(2)} AUD is Successful 🎉
          </h1>
          <p className="text-gray-700 mt-2">Thank you for your order!</p>

          {order.items && order.items.length > 0 && (
            <div className="mt-4 w-full max-w-lg border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Your Order:</h2>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-bold text-right">
                Total: ${(order.amount / 100).toFixed(2)}
              </div>
            </div>
          )}

          <Link href="/collection">
            <button className="mt-4 bg-gradient-hero text-white px-6 py-3 rounded-lg font-medium hover:bg-gradient-footer transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">Payment failed ❌</h1>
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
