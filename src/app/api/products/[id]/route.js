import { toast } from "sonner";
import { db } from "../../../../lib/db";
import { products } from "../../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(params.id)));
    return Response.json(product[0] || {});
  } catch {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    if (body.editPassword?.trim() !== process.env.ADMIN_DELETE_PASS?.trim()) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const updated = await db
      .update(products)
      .set({
        images: body.images,
        name: body.name,
        category: body.category,
        subCategory: body.subCategory,
        description: body.description,
        price: body.price,
        sizes: body.sizes,
        bestseller: body.bestseller,
      })
      .where(eq(products.id, Number(params.id)))
      .returning();

    return Response.json({ message: "Product updated", product: updated[0] });
  } catch {
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_DELETE_PASS) {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Invalid password" }),
      { status: 401 }
    );
  }

  try {
    await db.delete(products).where(eq(products.id, Number(params.id)));
    return Response.json({ message: "Product deleted" });
  } catch {
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
