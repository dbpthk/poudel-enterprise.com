import React from "react";
import Link from "next/link";

const CartNav = ({ path }) => {
  const cartLinks = [
    { tab: "1. Your Cart", link: "/cart" },
    { tab: "2. Your Details", link: "/checkout" },
    { tab: "3. Payment", link: "/checkout/payment" },
  ];

  // Find current index
  const currentIndex = cartLinks.findIndex((item) => item.link === path);

  return (
    <div className="flex justify-center gap-3 sm:gap-8 py-2 mx-auto mb-12">
      {cartLinks.map((item, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        // Only allow backward (completed steps)
        const isClickable = isCompleted;

        const baseClasses =
          "text-xs sm:text-sm font-medium px-3 py-2 rounded-md transition-colors";

        const stateClasses = isActive
          ? "text-primary font-bold border-b-2 border-primary"
          : isCompleted
          ? "text-gray-700 hover:text-primary cursor-pointer"
          : "text-gray-400 cursor-not-allowed";

        return isClickable ? (
          <Link href={item.link} key={item.link}>
            <span className={`${baseClasses} ${stateClasses}`}>{item.tab}</span>
          </Link>
        ) : (
          <span key={item.link} className={`${baseClasses} ${stateClasses}`}>
            {item.tab}
          </span>
        );
      })}
    </div>
  );
};

export default CartNav;
