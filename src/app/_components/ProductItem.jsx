"use client";

import Link from "next/link";
import { useShopContext } from "../_context/ShopContext";
import Image from "next/image";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useShopContext();

  return (
    <Link href={`/collection/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="overflow-hidden">
          <Image
            className="w-full h-30 sm:h-48 object-cover 
          transition-transform duration-300 ease-in-out group-hover:scale-105"
            src={image}
            alt={name}
            height={100}
            width={100}
            unoptimized
          />
        </div>
        <div className="p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-lg font-semibold text-blue-600">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
