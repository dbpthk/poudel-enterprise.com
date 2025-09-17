"use client";
import { ShopProvider } from "./_context/ShopContext";
import { ClerkProvider } from "@clerk/nextjs";

const Provider = ({ children, initialProducts }) => {
  return (
    <ClerkProvider>
      <ShopProvider initialProducts={initialProducts}>{children}</ShopProvider>
    </ClerkProvider>
  );
};

export default Provider;
