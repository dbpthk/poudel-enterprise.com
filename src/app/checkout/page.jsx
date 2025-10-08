"use client";
import Link from "next/link";
import { useShopContext } from "../_context/ShopContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cart from "./_checkoutComponent/Cart";
import CartNav from "./_checkoutComponent/CartNav";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const Checkout = () => {
  const { cartItems, userDetails, setUserDetails, isLoading } =
    useShopContext();

  // form state
  const [fname, setFname] = useState(userDetails?.fname || "");
  const [lname, setLname] = useState(userDetails?.lname || "");
  const [address, setAddress] = useState(userDetails?.address || "");
  const [city, setCity] = useState(userDetails?.city || "");
  const [state, setState] = useState(userDetails?.state || "");
  const [zip, setZip] = useState(userDetails?.zip || "");
  const [country, setCountry] = useState(userDetails?.country || "");
  const [phone, setPhone] = useState(userDetails?.phone || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const { user, isLoaded } = useUser();

  const path = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    // Prefill from Clerk if available
    const clerkFname = user?.firstName || "";
    const clerkLname = user?.lastName || "";
    const clerkEmail =
      user?.emailAddresses?.[0]?.emailAddress || user?.email || "";

    setFname(clerkFname || "");
    setLname(clerkLname || "");
    setEmail(clerkEmail || "");

    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
    setPhone("");
  }, [isLoaded, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

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

  //to pass data to payment page
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fname ||
      !lname ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !phone ||
      !email
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const details = {
      fname,
      lname,
      address,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    // Save in context
    if (setUserDetails) {
      setUserDetails(details);
    }

    //still save to localStorage
    localStorage.setItem("userDetails", JSON.stringify(details));

    // Navigate to payment page
    window.location.href = "/checkout/payment";
  };

  return (
    <div className="max-w-6xl mx-auto p-5 mb-30 min-h-[300px]">
      {cartItems.length > 0 ? (
        <>
          <CartNav path={path} />

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
                      onChange={(e) => setFname(e.target.value)}
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
                      onChange={(e) => setLname(e.target.value)}
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
                    onChange={(e) => setAddress(e.target.value)}
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
                      onChange={(e) => setCity(e.target.value)}
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
                      onChange={(e) => setState(e.target.value)}
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
                      onChange={(e) => setZip(e.target.value)}
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
                      onChange={(e) => setCountry(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                  onClick={handleSubmit}
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            {/* Cart Items */}
            <Cart />
          </div>
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
