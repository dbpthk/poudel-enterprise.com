CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text[] DEFAULT '{}' NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"sub_category" varchar(100),
	"description" text,
	"price" integer NOT NULL,
	"sizes" text[] DEFAULT '{}',
	"bestseller" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
