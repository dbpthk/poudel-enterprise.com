"use client";
import { useState, useEffect } from "react";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { useShopContext } from "../_context/ShopContext";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    image: [],
    name: "",
    category: "",
    subCategory: "",
    description: "",
    price: "",
    sizes: "",
    bestseller: false,
  });

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { user, isLoaded } = useShopContext();

  // if (!isLoaded) return <p>Loading...</p>;
  const isAdmin = user?.publicMetadata?.role === "admin";

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const body = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      bestseller: Boolean(formData.bestseller),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      setFormData({
        image: [],
        name: "",
        category: "",
        subCategory: "",
        description: "",
        price: "",
        sizes: "",
        bestseller: false,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      image: product.image || [],
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      description: product.description,
      price: product.price,
      sizes: product.sizes.join(","),
      bestseller: product.bestseller,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete product");
    }
  };

  return (
    <>
      {isAdmin ? (
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Admin Panel</h1>
          <p className="text-xl font-medium text-center mb-4">
            ✅ Welcome Admin {user?.firstName}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border p-4 rounded mb-8"
          >
            <input
              type="file"
              name="image"
              onChange={async (e) => {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("file", file);
                console.log(formData);

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                setFormData({ ...formData, image: data.url });
              }}
            />

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>

            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Subcategory</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              value={formData.sizes}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleChange}
              />
              Bestseller
            </label>

            <button
              type="submit"
              className="bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {message && <p className="text-green-600 mb-4">{message}</p>}

          <h2 className="text-xl font-bold mb-2">Product List</h2>
          <div className="flex flex-col gap-4">
            {products.length === 0 && <p>Loading Products....</p>}
            {products.map((p) => (
              <div
                key={p._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  {p.image && p.image[0] && (
                    <Image
                      src={p.image[0]}
                      width={50}
                      height={50}
                      alt="product image"
                    />
                  )}
                  <p>
                    <strong>{p.name}</strong>
                  </p>
                  <p>
                    {p.category} - {p.subCategory}
                  </p>
                  <p>Price: ${p.price}</p>
                  <p>Bestseller: {p.bestseller ? "Yes" : "No"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          ❌ You are not authorized
        </div>
      )}
    </>
  );
}
