import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createAdminProducts} from "../../redux/adminProductSlice"

function NewProductPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.adminProducts);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
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
      [name]: name === "price" || name === "countInStock" ? parseFloat(value) || "" : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()).filter((v) => v),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files, // Store File objects for multipart/form-data
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Form Data:", formData); // Debug log
      await dispatch(createAdminProducts(formData)).unwrap();
      alert("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        countInStock: "",
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
      });
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to create product: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Product</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Basic Inputs */}
        {["name", "sku", "category", "brand", "collections", "material", "gender"].map((field) => (
          <div key={field} className="grid w-full">
            <label className="block mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded"
              required={field === "name" || field === "sku"}
            />
          </div>
        ))}

        {/* Numeric Inputs */}
        {["price", "countInStock"].map((field) => (
          <div key={field} className="grid w-full">
            <label className="block mb-2">{field === "countInStock" ? "Stock" : "Price"}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded"
              required={field === "price"}
              min="0"
              step={field === "price" ? "0.01" : "1"}
            />
          </div>
        ))}

        {/* Multi-select Inputs */}
        {["size", "colors"].map((field) => (
          <div key={field} className="grid w-full">
            <label className="block mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              placeholder={field === "size" ? "Sizes (e.g., S, M, L)" : "Colors (e.g., Red, Blue)"}
              onChange={(e) => handleMultiSelect(field, e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        ))}

        {/* Description */}
        <div className="grid w-full col-span-1 md:col-span-2">
          <label className="block mb-2">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            rows={4}
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-1 grid gap-5 md:col-span-2">
          <label className="block mb-2 font-medium">Upload Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="p-2 border rounded"
          />
          <div className="flex gap-5">
            {formData.images.map((img, idx) => (
              <div key={idx} className="w-30 aspect-square border rounded">
                <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} className="object-cover w-30 h-30" />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`col-span-1 md:col-span-2 py-2 px-4 rounded mt-4 text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"}`}
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}

export default NewProductPage;