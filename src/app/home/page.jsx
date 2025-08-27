"use client";

import React, { useState, useEffect } from "react";
import { products } from "../_config/assets";
import Link from "next/link";

const Home = () => {
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

  // Get best sellers (products with bestseller: true)
  const bestSellers = products
    .filter((product) => product.bestseller)
    .slice(0, 8);

  // Get latest collection (most recent products by date)
  const latestCollection = [...products]
    .sort((a, b) => b.date - a.date)
    .slice(0, 8);

  useEffect(() => {
    console.log("Home component mounted");
    console.log("Total products:", products.length);
    console.log("Best sellers:", bestSellers.length);
    console.log("Latest collection:", latestCollection.length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden ">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero_img.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
            onError={() => handleImageError("/hero_img.png")}
            onLoad={() => handleImageLoad("/hero_img.png")}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Perfect Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Explore our latest collection of premium clothing for men, women,
              and kids. Quality meets style in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collection"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(product.image[0])}
                      onLoad={() => handleImageLoad(product.image[0])}
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Best Seller
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 capitalize">
                    {product.category} • {product.subCategory}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/collection"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Best Sellers
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Collection Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fresh arrivals and newest styles just in time for the season
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestCollection.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  {product.image && product.image.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(product.image[0])}
                      onLoad={() => handleImageLoad(product.image[0])}
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                      New
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 capitalize">
                    {product.category} • {product.subCategory}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/collection"
              className="inline-flex items-center px-8 py-4 bg-gradient-footer text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Latest Collection
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600">30-day return policy on all items</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customer Love
              </h3>
              <p className="text-gray-600">Rated 4.8/5 by our customers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
