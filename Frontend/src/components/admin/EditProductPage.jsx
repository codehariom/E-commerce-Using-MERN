import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProductPage() {
  const { productId } = useParams();

  // Initial state for form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    size: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  // Simulated fetch of existing product (replace with API later)
  useEffect(() => {
    // Example fetched data
    const fetchedProduct = {
      name: "Updated T-Shirt",
      description: "A high quality cotton t-shirt.",
      price: 599,
      countInStock: 20,
      sku: "TSHRT123",
      category: "Clothing",
      brand: "RabbitWear",
      size: ["S", "M", "L"],
      colors: ["Red", "Blue"],
      collections: "Summer 2025",
      material: "Cotton",
      gender: "Unisex",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    };
    setFormData(fetchedProduct);
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = await Promise.all(files.map((file) => toBase64(file)));
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", formData);
    // Call API to update product
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="collections"
          placeholder="Collections"
          value={formData.collections}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* Size and color input */}
        <input
          type="text"
          placeholder="Sizes (e.g., S, M, L)"
          value={formData.size.join(", ")}
          onChange={(e) => handleMultiSelect("size", e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Colors (e.g., Red, Blue)"
          value={formData.colors.join(", ")}
          onChange={(e) => handleMultiSelect("colors", e.target.value)}
          className="p-2 border rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded col-span-1 md:col-span-2"
          rows={4}
        />

        {/* Image upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-4"
          />

          {/* Preview current images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="aspect-square border rounded overflow-hidden">
                <img
                  src={img}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
