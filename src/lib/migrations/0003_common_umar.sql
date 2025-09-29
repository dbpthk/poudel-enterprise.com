ALTER TABLE "orders" ALTER COLUMN "items" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "updated_at";