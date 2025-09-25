import { db } from "../../../lib/db";
import { products } from "../../../lib/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.date));
    return Response.json(allProducts);
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newProduct = await db
      .insert(products)
      .values({
        images: body.images,
        name: body.name,
        category: body.category,
        subCategory: body.subCategory,
        description: body.description,
        price: body.price,
        sizes: body.sizes,
        bestseller: body.bestseller,
      })
      .returning();

    return Response.json({
      message: "Product created",
      product: newProduct[0],
    });
  } catch (err) {
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
