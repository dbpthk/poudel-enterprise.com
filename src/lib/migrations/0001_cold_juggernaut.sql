ALTER TABLE "products" RENAME COLUMN "image" TO "images";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "created_at" TO "date";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "sub_category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "sizes" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "sizes" DROP DEFAULT;