"use client";
import React from "react";
import { useShopContext } from "../../_context/ShopContext";
import { useRouter } from "next/navigation";

const DeliveryDetails = () => {
  const { userDetails } = useShopContext();
  const router = useRouter();

  const handleChangeDetails = (e) => {
    router.push("/checkout");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full">
      <div className="flex flex-row justify-between items-center gap-10">
        <div className="space-y-1 text-gray-700">
          <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
          <p>
            <span className="font-medium">Name: </span>
            {userDetails.fname} {userDetails.lname}
          </p>
          <p>
            <span className="font-medium">Address: </span>
            {userDetails.address}
          </p>
          <p>
            <span className="font-medium">City/State/ZIP: </span>
            {userDetails.city}, {userDetails.state} {userDetails.zip}
          </p>
          <p>
            <span className="font-medium">Country: </span>
            {userDetails.country}
          </p>
          <p>
            <span className="font-medium">Phone: </span>
            {userDetails.phone}
          </p>
          <p>
            <span className="font-medium">Email: </span>
            {userDetails.email}
          </p>
        </div>

        <button
          onClick={handleChangeDetails}
          className="mt-6 ml-2 w-fit bg-gray-200 text-gray-700 py-1 px-3 rounded-lg font-sm hover:bg-gray-300 cursor-pointer active:scale-95 transition-all duration-300"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetails;
