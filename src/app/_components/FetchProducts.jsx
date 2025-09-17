// src/app/_components/FetchProducts.jsx
import { db } from "../../lib/db";
import { products } from "../../lib/schema";
import { ShopProvider } from "../_context/ShopContext";

export default async function FetchProducts({ children }) {
  // server-side fetch
  const allProducts = await db.select().from(products);

  return <ShopProvider initialProducts={allProducts}>{children}</ShopProvider>;
}
