import { products as initialProducts } from "../../../_config/assets";
let products = [...initialProducts];

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const index = products.findIndex((p) => p._id === id);
  if (index === -1)
    return Response.json({ error: "Product not found" }, { status: 404 });

  products[index] = {
    ...products[index],
    ...body,
    image: Array.isArray(body.image) ? body.image : body.image.split(","),
    sizes: Array.isArray(body.sizes) ? body.sizes : body.sizes.split(","),
    bestseller: Boolean(body.bestseller),
  };

  return Response.json({
    message: "Product updated successfully",
    product: products[index],
  });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  products = products.filter((p) => p._id !== id);
  return Response.json({ message: "Product deleted successfully" });
}
