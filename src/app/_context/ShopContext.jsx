"use client";
import { createContext, useContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoads, setImageLoads] = useState({});

  const handleImageError = (imagePath) => {
    console.error(`Failed to load image: ${imagePath}`);
    setImageErrors((prev) => ({ ...prev, [imagePath]: true }));
  };

  const handleImageLoad = (imagePath) => {
    console.log(`Successfully loaded image: ${imagePath}`);
    setImageLoads((prev) => ({ ...prev, [imagePath]: true }));
  };

  return (
    <ShopContext.Provider
      value={{ imageErrors, imageLoads, handleImageError, handleImageLoad }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};
