"use client";
import { ShopProvider } from "./_context/ShopContext";

const Provider = ({ children }) => {
  return <ShopProvider>{children}</ShopProvider>;
};

export default Provider;
