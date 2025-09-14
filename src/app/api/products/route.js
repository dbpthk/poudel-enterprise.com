import { products as initialProducts } from "../../_config/assets";

// Copy initial products into in-memory array
let products = [...initialProducts];

export async function GET() {
  return Response.json(products);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      image,
      name,
      category,
      subCategory,
      description,
      price,
      sizes,
      bestseller,
    } = body;

    if (
      !image ||
      !name ||
      !category ||
      !subCategory ||
      !description ||
      !price ||
      !sizes
    ) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = {
      _id: Date.now().toString(),
      image: Array.isArray(image) ? image : image.split(","),
      name,
      category,
      subCategory,
      description,
      price: Number(price),
      sizes: Array.isArray(sizes) ? sizes : sizes.split(","),
      bestseller: Boolean(bestseller),
      date: Date.now(),
    };

    products.push(newProduct);
    return Response.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
