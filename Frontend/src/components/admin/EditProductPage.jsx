import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/adminProductSlice";
import axios from "axios";
import { updateProduct } from "../../redux/productSlice";

function EditProductPage() { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
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

  const [uploading, setUploading] = useState(false);

  // Fetch product details
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    } ;
  }, [dispatch, id]);

  // Populate form when product details are fetched
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  },[selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: {"Content-Type":"multipart/form-data"} }
      );

      setProductData((prevData) => ({
        ...prevData,
        images : [... prevData.images ,{url:data.imageUrl,altText:""}]
      }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          value={productData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={productData.sku}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={productData.brand}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="collections"
          placeholder="Collections"
          value={productData.collections}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={productData.material}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={productData.gender}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={productData.countInStock}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Sizes (e.g., S, M, L)"
          value={productData.size.join(", ")}
          onChange={(e) => setProductData({...productData,size:e.target.value.split(",").map((size)=> size.trim())})}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Colors (e.g., Red, Blue)"
          value={productData.colors.join(", ")}
          onChange={(e) => setProductData({...productData,colors:e.target.value.split(",").map((color)=> color.trim())})}
          className="p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          className="p-2 border rounded col-span-1 md:col-span-2"
          rows={4}
        />

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-4"
          />
          {uploading && <p>Uploading images...</p>}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productData.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square border rounded overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={img.altText || `preview-${idx}`}
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