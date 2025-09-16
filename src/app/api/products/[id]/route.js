// import { products as initialProducts } from "../../../_config/assets";
// let products = [...initialProducts];

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const body = await req.json();

//   const index = products.findIndex((p) => p._id === id);
//   if (index === -1)
//     return Response.json({ error: "Product not found" }, { status: 404 });

//   products[index] = {
//     ...products[index],
//     ...body,
//     image: Array.isArray(body.image) ? body.image : body.image.split(","),
//     sizes: Array.isArray(body.sizes) ? body.sizes : body.sizes.split(","),
//     bestseller: Boolean(body.bestseller),
//   };

//   return Response.json({
//     message: "Product updated successfully",
//     product: products[index],
//   });
// }

// export async function DELETE(req, { params }) {
//   const { id } = params;
//   products = products.filter((p) => p._id !== id);
//   return Response.json({ message: "Product deleted successfully" });
// }

import { db } from "@/lib/db";
import { products } from "@/drizzle/schema";
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
    const updated = await db
      .update(products)
      .set({
        image: body.image,
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
