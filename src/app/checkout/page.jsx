"use client";
import Link from "next/link";
import { useShopContext } from "../_context/ShopContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Checkout = () => {
  const { cartItems, getCartTotal, removeFromCart, currency, isLoading } =
    useShopContext();
  const path = usePathname();
  console.log("Current path:", path);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  const cartLinks = [
    { tab: "1. Your Cart", link: "/cart" },
    { tab: "2. Your Details", link: "/checkout" },
    { tab: "3. Payment", link: "/payment" },
  ];

  // form state
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // fill dummy data
  const handleFillData = (e) => {
    e.preventDefault();
    setFname("John");
    setLname("Doe");
    setAddress("123 Main St");
    setCity("Town Hall");
    setState("Sydney");
    setZip("2000");
    setCountry("Australia");
    setPhone("+61 123 456 789");
    setEmail("DoeJohn@gmail.com");
  };
  const clearFilledData = (e) => {
    e.preventDefault();
    setFname("");
    setLname("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
    setPhone("");
    setEmail("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mb-30 min-h-[300px]">
      {cartItems.length > 0 ? (
        <>
          {/* Breadcrumb */}
          <div className="flex justify-center gap-10 py-2 mx-auto mb-20">
            {cartLinks.map((item, index) => (
              <Link href={item.link} key={index}>
                <span
                  className={`mx-2 text-sm font-medium   \ ${
                    item.link === path
                      ? "text-primary p-2 font-bold border-b-2 border-gray-300"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {item.tab}
                </span>
              </Link>
            ))}
          </div>

          {/* delivery informaiton  */}

          <div className="flex flex-col justify-center lg:flex-row gap-10 sm:gap-30">
            <div className="min-w-[300px]">
              <h2 className="text-2xl font-semibold mb-4">
                Delivery Information
              </h2>
              <form className="space-y-4">
                <div className="flex flex-rowq gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={fname}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={lname}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt 1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                    required
                    value={address}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={city}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={state}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal/Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={zip}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                      required
                      value={country}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                    required
                    value={phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-color-accent focus:border-color-accent"
                    required
                    value={email}
                  />
                </div>
                {/* dummy date  */}
                <div className="flex justify-end">
                  <button
                    className="mt-6 ml-2 w-fit bg-gray-200 text-gray-700 py-1 px-3 rounded-lg font-sm hover:bg-gray-300 cursor-pointer active:scale-95 transition-all duration-300"
                    onClick={handleFillData}
                  >
                    Fill test data
                  </button>
                  <button
                    className="mt-6 ml-2 w-fit bg-gray-200 text-gray-700 py-1 px-3 rounded-lg font-sm hover:bg-gray-300 cursor-pointer active:scale-95 transition-all duration-300"
                    onClick={clearFilledData}
                  >
                    Clear
                  </button>
                </div>

                {/* Proceed to Payment Button */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-gradient-hero text-white py-3 rounded-lg font-medium hover:bg-gradient-footer cursor-pointer active:scale-95 transition-all duration-300"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            {/* Cart Items */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

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
                        <h2 className="text-xs sm:text-sm font-medium">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
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
                      {getCartTotal() > 200
                        ? getCartTotal()
                        : getCartTotal() + 20}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/collection">
            <button className="bg-gradient-hero text-white px-6 py-3 rounded-lg font-medium hover:bg-gradient-footer cursor-pointer active:scale-95 transition-all duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
