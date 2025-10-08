"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();

export const ShopProvider = ({ children, initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  //cart loading
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [imageErrors, setImageErrors] = useState({});
  const [imageLoads, setImageLoads] = useState({});
  // Track whether we've finished loading from localStorage
  const [isCartLoaded, setisCartLoaded] = useState(false);

  //get user details from cartpage
  const [userDetails, setUserDetails] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userDetails") || "{}")
      : {}
  );

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

  const getCartTotal = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const paymentAmount = useMemo(() => {
    const total = getCartTotal();
    if (total > 0) {
      return total > 200 ? total : total + 20;
    } else {
      return 0;
    }
  }, [getCartTotal]);

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
      clearCart,
      getCartTotal,
      paymentAmount,
      currency,
      userDetails,
      setUserDetails,

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
