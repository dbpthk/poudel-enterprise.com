"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useShopContext } from "../_context/ShopContext";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    images: [],
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { user, isLoaded } = useUser();
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

  // inside your component
  useEffect(() => {
    return () => {
      // cleanup all preview URLs on unmount
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin "></div>
        {/* Loading... */}
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setPreviewImages((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file)); // append all files to the same FormData

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData, // DO NOT set Content-Type manually!
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      // inside handleImageUpload, safer merge:
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...data.urls],
      }));
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Prompt for admin password
    const password = prompt("Enter admin password to save changes:");
    if (!password) {
      setMessage("Password is required to submit changes.");
      return;
    }
    setIsSubmitting(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const body = {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes.split(",").map((s) => s.trim()),
      bestseller: Boolean(formData.bestseller),
      editPassword: password, // send password for backend verification
    };

    console.log(url);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      if (res.ok) {
        setFormData({
          images: [],
          name: "",
          category: "",
          subCategory: "",
          description: "",
          price: "",
          sizes: "",
          bestseller: false,
        });
        setPreviewImages([]);
        setEditingId(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      images: product.images || [],
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      description: product.description,
      price: product.price,
      sizes: product.sizes.join(","),
      bestseller: product.bestseller,
    });
    setPreviewImages(product.images || []);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const password = prompt("Enter admin password to delete:");
    if (!password) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete");
        return;
      }

      fetchProducts();
      toast.success("Product deleted");
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
          <p className="text-xl font-heading text-center mb-4">
            ✅ Welcome {user?.firstName}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border border-gray-300 p-4 rounded-xl mb-8 shadow-lg"
          >
            {/* Styled file input with thumbnails */}
            <div className=" shadow-lg border-1 border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
              <label className="cursor-pointer font-body text-gray-600">
                Click to add Images here
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={!isAdmin}
                />
              </label>

              {previewImages.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {previewImages.map((src, idx) => (
                    <div
                      key={idx}
                      className="w-24 h-24 relative border rounded overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
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
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
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
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
            />

            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              value={formData.sizes}
              onChange={handleChange}
              className="border border-gray-400 p-3 rounded-xl"
              required
              disabled={!isAdmin}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleChange}
                disabled={!isAdmin}
              />
              Bestseller
            </label>

            <button
              type="submit"
              disabled={!isAdmin}
              className="bg-gradient-footer cursor-pointer text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>

          {message && <p className="text-green-600 mb-4">{message}</p>}

          <h2 className="text-xl font-bold mb-2">Product List</h2>
          <div className="flex flex-col gap-4">
            {products.length === 0 && <p>Loading Products....</p>}
            {products.map((p) => (
              <div
                key={p.id}
                className="border bg-color-accent border-gray-400 p-3 rounded-xl flex justify-between items-center"
              >
                <div>
                  {p.images && p.images[0] && (
                    <Image
                      src={p.images[0]}
                      width={70}
                      height={70}
                      alt="product image"
                      className="border border-gray-200"
                    />
                  )}
                  <p className="font-medium text-color-primary text-sm sm:text-lg">
                    {p.name}
                  </p>
                  <p className="text-sm sm:text-md">
                    {p.category} - {p.subCategory}
                  </p>
                  <p>Price: ${p.price}</p>
                  <p>Bestseller: {p.bestseller ? "Yes" : "No"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
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
