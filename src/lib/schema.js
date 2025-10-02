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

// orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  customerName: text("customer_name").default(""), // optional: useful for admin display
  items: json("items").notNull(), // array of cart items
  amount: integer("amount").notNull(), // total order amount
  status: text("status").default("pending"), // pending / paid / failed
  stripeId: text("stripe_id").default(""),
  deliveryInfo: json("delivery_info").default({}), // JSON object for address
  createdAt: timestamp("created_at").defaultNow(),
});
