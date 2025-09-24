"use client";
import React from "react";
import { useShopContext } from "../../_context/ShopContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    currency,
    removeFromCart,
    getCartCount,
    getCartTotal,
    paymentAmount,
  } = useShopContext();
  return (
    <div>
      <div className="flex flex-col justify-between lg:flex-row gap-6 mb-2">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div>
          <ShoppingBag /> <span> {getCartCount()} Items </span>
        </div>
      </div>

      <div className="flex flex-col border border-gray-300 rounded-xl p-5 min-w-[300px] gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id + item.size}
            className="flex items-end justify-between border border-gray-200 shadow-2xs p-4 rounded-lg"
          >
            {/* Left Side: Image + Info */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href={`/collection/${item.id}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
              </Link>
              <div>
                <h2 className="text-xs sm:text-sm font-medium">{item.name}</h2>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-700">
                  {currency}
                  {item.price} × {item.quantity} ={" "}
                  <span className="font-semibold">
                    {currency}
                    {item.price * item.quantity}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Side: Controls */}

            <button
              onClick={() => removeFromCart(item.id, item.size)}
              className="px-3 text-xs py-1 border rounded text-red-500 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Cart Total Section */}
        <div className="mt-8 p-6 border border-gray-300 drop-shadow-lg rounded-lg bg-gray-50">
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal:</span>
            <span>
              {currency}
              {getCartTotal()}
            </span>
          </div>
          <div>
            {getCartTotal() > 200 ? (
              <p className="text-sm text-green-600 mt-1">
                You qualify for free shipping!
              </p>
            ) : (
              <div className="text-sm text-gray-600 mt-1 flex justify-between">
                <span>Delivery</span> <span>{currency}20</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-xl font-semibold mt-4 border-t pt-4">
            <span>Total:</span>

            <span>
              {currency}
              {paymentAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
