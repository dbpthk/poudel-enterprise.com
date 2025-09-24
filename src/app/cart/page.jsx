"use client";
import Link from "next/link";
import { useShopContext } from "../_context/ShopContext";
import Image from "next/image";

const CartSummary = () => {
  const {
    cartItems,
    getCartTotal,
    decreaseQuantity,
    removeFromCart,
    addToCart,
    isLoading,
    router,
    currency,
  } = useShopContext();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[300px]">
      <h1
        className="text-4xl lg:text-6xl font-bold leading-tight w-full text-center mb-10"
        style={{ color: "#1F2937" }}
      >
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id + item.size}
                className="flex items-center justify-between border border-gray-200 shadow-2xs p-4 rounded-lg"
              >
                {/* Left Side: Image + Product Info */}
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
                    <h2 className="text-xs sm:text-sm font-medium">
                      {item.name}
                    </h2>
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

                {/* Right Side: Quantity Controls + Remove */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Increase/Decrease Section */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.size)}
                      disabled={item.quantity <= 1}
                      className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded 
                    ${
                      item.quantity <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100 active:scale-95"
                    }`}
                    >
                      -
                    </button>
                    <span className="min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.id, item.size)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded hover:bg-gray-100 active:scale-95"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="px-3 text-xs sm:text-sm py-1 border rounded text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total Section */}
          <div className="mt-8 p-6 border border-gray-300 drop-shadow-lg rounded-lg bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>
                {currency}
                {getCartTotal()}
              </span>
            </div>

            {/* checkout buttton */}
            <Link href={"/checkout"}>
              <button className="mt-6 w-full bg-gradient-hero text-white py-3 rounded-lg font-medium hover:bg-gradient-footer cursor-pointer active:scale-95 transition-all duration-300">
                Continue to Details
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
