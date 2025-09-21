"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();

export const ShopProvider = ({ children, initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [imageErrors, setImageErrors] = useState({});
  const [imageLoads, setImageLoads] = useState({});
  // Track whether we've finished loading from localStorage
  const [isCartLoaded, setisCartLoaded] = useState(false);

  const currency = "$";
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Load cart from localStorage on mount

  // Load cart on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch {
        setCartItems([]);
      }
    }
    setisCartLoaded(true);
    setIsLoading(false);
  }, []);

  // Save cart only after load is complete
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // ---------------- CART FUNCTIONS ----------------
  const addToCart = (productId, size, quantity = 1) => {
    const id = Number(productId);
    const product = products.find((p) => p.id === id);
    if (!product) return;

    let isNewItem = true;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === id && item.size === size
      );

      if (existing) {
        isNewItem = false;
        return prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.images[0],
          size,
          price: product.price,
          quantity,
        },
      ];
    });

    toast.success(
      isNewItem
        ? `${product.name} ${size} added to cart!`
        : `Increased quantity of ${product.name} in cart!`,
      { duration: 1000 }
    );
  };

  const removeFromCart = (productId, size) => {
    const id = Number(productId);
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const decreaseQuantity = (productId, size) => {
    const id = Number(productId);
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartCount = useMemo(() => getCartCount(), [cartItems]);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ---------------- IMAGE HELPERS ----------------
  const handleImageError = (imagePath) => {
    setImageErrors((prev) => ({ ...prev, [imagePath]: true }));
  };

  const handleImageLoad = (imagePath) => {
    setImageLoads((prev) => ({ ...prev, [imagePath]: true }));
  };

  // ---------------- CONTEXT VALUE ----------------
  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      cartItems,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      getCartCount,
      cartCount,
      getCartTotal,
      currency,

      search,
      setSearch,
      showSearch,
      setShowSearch,

      imageErrors,
      imageLoads,
      handleImageError,
      handleImageLoad,

      user,
      isLoaded,
      isLoading,
      router,
    }),
    [
      products,
      cartItems,
      search,
      showSearch,
      imageErrors,
      imageLoads,
      user,
      isLoaded,
      isLoading,
    ]
  );

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);
