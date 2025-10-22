export const dynamic = "force-dynamic";

// src/app/_components/FetchProducts.jsx
import { db } from "../../lib/db";
import { products } from "../../lib/schema";
import Provider from "./../Provider.jsx";
import { desc } from "drizzle-orm";

export default async function FetchProducts({ children }) {
  const fetchedProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.date));

  const serializedProducts = fetchedProducts.map((p) => ({
    ...p,
    date: p.date?.toISOString(),
  }));

  return <Provider initialProducts={serializedProducts}>{children}</Provider>;
}
