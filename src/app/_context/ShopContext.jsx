"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { products } from "../_config/assets";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  console.log("ShopProvider re-rendered");
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoads, setImageLoads] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currency = "$";
  const { user, isLoaded } = useUser();

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("saved");
  }, [cartItems]);

  // Sync cart across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cartItems") {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCartItems(updatedCart);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = (productId, size, quantity = 1) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    let isNewItem = true;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === productId && item.size === size
      );

      if (existing) {
        isNewItem = false;
        return prev.map((item) =>
          item._id === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            image: product.image[0],
            size,
            price: product.price,
            quantity,
          },
        ];
      }
    });

    toast.success(
      isNewItem
        ? `${product.name} ${size} added to cart!`
        : `Increased quantity of ${product.name} in cart!`,
      { duration: 1000 }
    );
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  const decreaseQuantity = (productId, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleImageError = (imagePath) => {
    console.error(`Failed to load image: ${imagePath}`);
    setImageErrors((prev) => ({ ...prev, [imagePath]: true }));
  };

  const handleImageLoad = (imagePath) => {
    console.log(`Successfully loaded image: ${imagePath}`);
    setImageLoads((prev) => ({ ...prev, [imagePath]: true }));
  };

  const contextValue = useMemo(
    () => ({
      imageErrors,
      imageLoads,
      handleImageError,
      handleImageLoad,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      products,
      currency,
      addToCart,
      removeFromCart,
      getCartTotal,
      cartItems,
      decreaseQuantity,
      getCartCount,
      user,
      isLoaded,
      isLoading,
    }),
    [imageErrors, imageLoads, search, showSearch, cartItems]
  );

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
