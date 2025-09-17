"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { useShopContext } from "../_context/ShopContext";

const BestSeller = () => {
  const { handleImageError, handleImageLoad, products } = useShopContext();

  // Get best sellers (products with bestseller: true)
  const bestSellers = useMemo(() => {
    return products.filter((product) => product.bestseller).slice(0, 8);
  }, [products]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most loved and popular items that customers can't stop buying
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <Link key={product.id} href={`/collection/${product.id}`}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden h-70">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={320}
                      loading="lazy"
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(product.images[0])}
                      onLoad={() => handleImageLoad(product.images[0])}
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Best Seller
                    </span>
                  </div>
                </div>

                <div className="p-6 md:min-h-[200px]">
                  <h3 className="text-md md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-3 capitalize">
                    {product.category} • {product.subCategory}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
