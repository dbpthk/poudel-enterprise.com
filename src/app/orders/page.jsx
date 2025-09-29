"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useShopContext } from "../_context/ShopContext";

const Orders = () => {
  const { user } = useUser();
  const { userDetails } = useShopContext();
  const dummyOrders = [
    { name: "men tshirt", size: "M", quantity: 3 },
    { name: "women tshirt", size: "LG", quantity: 2 },
  ];

  if (!user) return <p className="flex justify-center p-20">Loading...</p>;

  return (
    <div className="py-10 flex flex-col gap-10 justify-center items-center">
      <h1 className="text-2xl">
        Welcome Back, <span>{user.firstName}</span> Your Orders
      </h1>
      <div className="flex flex-col">
        <p>
          {userDetails.fname} <span>{userDetails.lname}</span>
        </p>
        <p>{userDetails.address}</p>
        <p>{userDetails.city}</p>
        <p>{userDetails.phone}</p>
        <p>{userDetails.email}</p>
      </div>
      {dummyOrders.map((order, index) => (
        <div className="p-10 border flex flex-col">
          <div className="flex flex-row gap-10" key={index}>
            <h2>{order.name}</h2>
            <p>{order.size}</p>
            <p>{order.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
