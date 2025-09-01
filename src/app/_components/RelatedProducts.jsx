"use client";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../_context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useShopContext();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Related Products
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
