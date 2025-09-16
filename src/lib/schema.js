// src/lib/schema.js
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  images: json("images").notNull(), // array of image paths
  category: text("category"),
  subCategory: text("sub_category"),
  sizes: json("sizes"), // array of sizes
  date: timestamp("date").defaultNow(),
  bestseller: boolean("bestseller").default(false),
});
