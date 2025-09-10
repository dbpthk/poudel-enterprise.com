"use client";
import { ShopProvider } from "./_context/ShopContext";
import { ClerkProvider } from "@clerk/nextjs";

const Provider = ({ children }) => {
  return (
    <ClerkProvider>
      <ShopProvider>{children}</ShopProvider>
    </ClerkProvider>
  );
};

export default Provider;
