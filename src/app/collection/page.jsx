"use client";
import React from "react";
import { products } from "../_config/assets";
import Link from "next/link";
import Image from "next/image";
import { useShopContext } from "../_context/ShopContext";
import { useState, useMemo } from "react";

const Collection = () => {
  const { handleImageError, handleImageLoad, search, showSearch } =
    useShopContext();

  const allProducts = Object.values(products); //master copy
  const [sortType, setSortType] = useState("relevance");
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // filter by
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item != value)
        : [...prev, value]
    );
  };
  const clearFilter = () => {
    setCategory([]);
    setSubCategory([]);
  };

  // search
  const filteredProducts = useMemo(() => {
    let productsCopy = allProducts;
    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    // sorting
    if (sortType === "price-low-to-high") {
      productsCopy = [...productsCopy].sort((a, b) => a.price - b.price);
    } else if (sortType === "price-high-to-low") {
      productsCopy = [...productsCopy].sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  }, [search, category, subCategory, sortType, allProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-10 md:py-15 px-4 bg-white flex flex-col items-center gap-10">
        <div className="text-center mb-0 sm:mb-8">
          <h1
            className="text-4xl lg:text-6xl font-bold leading-tight"
            style={{ color: "#1F2937" }}
          >
            Products
          </h1>
        </div>

        {/* Filter Section */}
        <div
          className={`${
            isOpen
              ? "transition-all duration-300 w-full max-w-6xl  h-fit "
              : "transition-all duration-300 w-[200px] h-[50px] "
          }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-4 ${
              isOpen && " sm:px-15"
            } sticky top-24`}
          >
            {/* Filter Header */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-[20px] sm:h-[30px] justify-between items-center cursor-pointer group mb-2"
            >
              <h2
                className={`text-md sm:text-lg font-bold text-gray-80  w-full text-center ${
                  isOpen && "text-color-accent"
                }`}
              >
                Filter By
              </h2>
              <div
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  className={`w-6 h-6 text-gray-500 ${
                    isOpen && "text-color-accent"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
                {/* Category Filter */}
                <div className="space-y-4 md:border md:border-gray-200 p-2 rounded-xl">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-md font-semibold text-gray-800">
                      Category
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Men", "Women", "Kids"].map((cat) => (
                      <label
                        key={cat}
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-0 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-200 group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            value={cat}
                            onChange={toggleCategory}
                            checked={category.includes(cat)}
                            className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                          />
                          <div className="absolute inset-0 w-5 h-5 rounded-lg bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* <div className="bg-gray-500 w-full h-[2px] md:hidden rounded-xl"></div> */}
                {/* SubCategory Filter */}
                <div className="space-y-4 md:border md:border-gray-200 p-2 rounded-xl">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-md font-semibold text-gray-800">
                      SubCategory
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                      <label
                        key={subCat}
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 p-0 rounded-xl hover:bg-purple-50 cursor-pointer transition-all duration-200 group"
                      >
                        <div className="">
                          <input
                            type="checkbox"
                            value={subCat}
                            onChange={toggleSubCategory}
                            checked={subCategory.includes(subCat)}
                            className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                          />
                          <div className="absolute inset-0 w-5 h-5 rounded-lg bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors duration-200">
                          {subCat}
                        </span>
                        <div className="ml-auto"></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="">
                  <button
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={clearFilter}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* sort by */}
          <div className="flex flex-row justify-end mb-8">
            <div className="flex flex-row justify-between items-center gap-4">
              <label htmlFor="sort" className="font-medium">
                Sort by
              </label>
              <select
                onChange={(e) => setSortType(e.currentTarget.value)}
                value={sortType}
                name="sort"
                id="sort"
                className="border border-gray-300 px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-1 font-medium"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div
            className={`gap-8 ${
              filteredProducts.length === 0
                ? "w-full flex justify-center" // take full width and center content
                : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product._id} href={`/collection/${product._id}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ">
                    <div className="overflow-hidden h-60">
                      {product.image && product.image.length > 0 && (
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={400}
                          height={320}
                          unoptimized={true}
                          onError={() => handleImageError(product.image[0])}
                          onLoad={() => handleImageLoad(product.image[0])}
                        />
                      )}
                    </div>

                    <div className="p-6">
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
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2 2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-lg sm:text-xl font-medium text-center">
                  Oops! No products available.
                </p>
                <p className="text-gray-400 text-sm sm:text-base mt-2 text-center">
                  Check back later or try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
