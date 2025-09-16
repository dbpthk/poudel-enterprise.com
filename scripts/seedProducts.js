import { drizzle } from "drizzle-orm/node-postgres";
import { products } from "../src/lib/schema.js";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const productFilePath = path.join(
  process.cwd(),
  "src/app/_config/products.json"
);
const productData = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));

async function seedProducts() {
  try {
    for (const item of productData) {
      await db.insert(products).values({
        name: item.name,
        description: item.description,
        price: item.price,
        images: item.image, // plain JS array, works with jsonb
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes, // plain JS array, works with jsonb
        date: new Date(item.date),
        bestseller: item.bestseller || false,
      });

      console.log(`✅ Inserted: ${item.name}`);
    }

    console.log("🎉 All products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  }
}

seedProducts();
