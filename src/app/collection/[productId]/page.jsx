"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useShopContext } from "../../_context/ShopContext";
import RelatedProducts from "../../_components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShopContext();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (!products || !productId) return;

    // normalize to array
    const productArray = Array.isArray(products)
      ? products
      : Object.values(products);
    const id = Number(productId);
    const foundProduct = productArray.find((item) => item.id === id);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]); // first image
    }
  }, [products, productId]);
  console.log(productData);

  if (!productData) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Images */}
        <div className="flex-1 flex flex-col gap-4">
          <Image
            src={image}
            alt={productData.name}
            width={500}
            height={500}
            className="rounded-lg shadow-md object-cover"
            priority
          />
          <div className="flex gap-3 overflow-x-auto ">
            {productData.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={productData.name + " " + (index + 1)}
                width={100}
                height={100}
                onClick={() => setImage(img)}
                className={`cursor-pointer rounded-md object-cover w-20 h-20 ${
                  image === img ? "ring-2 ring-orange-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-3">{productData.name}</h1>
          <p className="text-gray-500 mb-3">
            {productData.category} • {productData.subCategory}
          </p>
          <p className="text-2xl font-bold mb-5">
            {currency}
            {productData.price}
          </p>

          {/* Sizes */}
          <div className="mb-6">
            <p className="mb-2 font-medium">Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-md ${
                    s === size
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData.id, size)}
            disabled={!size}
            className={`px-6 py-3 rounded-lg font-medium  ${
              size
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {size ? "Add to Cart" : "Select a size"}
          </button>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {productData.description}
          </p>
        </div>
      </div>
      <div>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
