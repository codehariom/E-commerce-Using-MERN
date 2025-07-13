import React, { useState } from "react";

function NewProductPage() {
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
    const imageUrls = await Promise.all(
      files.map((file) => toBase64(file))
    );
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
    console.log("New Product Data:", formData);
    // Send formData to backend here
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Basic Inputs */}
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
          required
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* Multi-select inputs */}
        <input
          type="text"
          placeholder="Sizes (e.g., S, M, L)"
          onChange={(e) => handleMultiSelect("size", e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Colors (e.g., Red, Blue)"
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
          <label className="block mb-2 font-medium">Upload Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            placeholder="select the Image"
            onChange={handleImageUpload}
            className="mb-4 border py-2 px-4"
          />

          {/* Image Preview */}
          <div className="flex gap-5">
            {formData.images.map((img, index) => (
              <div
                key={index}
                className="w-30 aspect-square border rounded "
              >
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="object-cover w-30 h-30"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 mt-4"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}

export default NewProductPage;
