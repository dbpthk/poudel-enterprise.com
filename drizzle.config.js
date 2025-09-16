import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// load .env.local explicitly
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./src/lib/schema.js",
  out: "./src/lib/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
