ALTER TABLE "orders" ALTER COLUMN "customer_name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "stripe_id" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "delivery_info" SET DEFAULT '{}'::json;