"use client";
import { createContext, useContext, useState } from "react";

export const ShopContext = createContext();
import { products } from "../_config/assets";
import { toast } from "sonner";

export const ShopProvider = ({ children }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoads, setImageLoads] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const currency = "$";

  const addToCart = (productId, size, quantity = 1) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    let isNewItem = true;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === productId && item.size === size
      );

      if (existing) {
        // If item already in cart → increase only by quantity
        isNewItem = false;
        return prev.map((item) =>
          item._id === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If new → add with quantity = passed value
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            image: product.image[0], // ✅ store first image
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

  // total cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ Calculate totals
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Remove from cart
  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  // ✅ Decrease quantity (instead of full remove)
  const decreaseQuantity = (productId, size) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item._id === productId && item.size === size) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // remove if qty = 0
    });
  };

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
      value={{
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};
