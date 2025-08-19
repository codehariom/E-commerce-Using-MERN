import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchSimilarProducts } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => {
      return state.products;
    }
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("/placeholder.png");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id

  useEffect(() => {
    if (productFetchId) {
      console.log("Fetching product with ID:", productFetchId); // Debug product ID
      dispatch(fetchProductById(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    } 
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    } else {
      setMainImage("/placeholder.png"); // Fallback if no images
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "Plus") setQuantity((prev) => prev + 1);
    if (action === "Minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) return <p>Loading product...</p>;
  if (error) {
    toast.error(`Error: ${error}`);
    return <p>Error: {error}</p>;
  }
  if (!selectedProduct) {
    return <p>No product data available.</p>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.length > 0 ? (
              selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url || "/placeholder.png"}
                  alt={image.altText || "Thumbnail"}
                  className={`w-25 h-25 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url
                      ? "border-black border-2"
                      : "border-gray-600"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage || "/placeholder.png"}
                alt={selectedProduct.name || "Product Image"}
                className="w-full h-auto object-cover border-2 rounded-lg"
              />
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images?.length > 0 ? (
              selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url || "/placeholder.png"}
                  alt={image.altText || "Thumbnail"}
                  className={`w-25 h-25 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url
                      ? "border-black border-2"
                      : "border-gray-600"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Product info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              {selectedProduct.name || "Unnamed Product"}
            </h1>

            {/* Prices */}
            <div className="flex space-x-5 text-center">
              {selectedProduct.originalPrice && (
                <p className="text-2xl text-gray-400 line-through">
                  ${selectedProduct.originalPrice}
                </p>
              )}
              <p className="text-2xl text-black mb-5 font-semibold">
                ${selectedProduct.price || "N/A"}
              </p>
            </div>

            <p className="text-gray-500 mb-4">
              {selectedProduct.description || "No description available"}
            </p>

            {/* Colors */}
            {selectedProduct.colors?.length > 0 ? (
              <div>
                <p className="text-gray-700">Color</p>
                <div className="flex gap-2 mb-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 mt-1 rounded-full border ${
                        selectedColor === color
                          ? "border-3 border-black"
                          : "border-gray-400"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p>No colors available</p>
            )}

            {/* Sizes */}
            {selectedProduct.sizes?.length > 0 ? (
              <div className="mt-4">
                <p className="text-gray-700">Size</p>
                <div className="flex gap-3 mb-4">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedSize === size
                          ? "border-2 border-black"
                          : "border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>No sizes available</p>
            )}

            {/* Quantity */}
            <div className="mt-4">
              <p className="text-gray-700">Quantity</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("Minus")}
                  className="px-3 py-1 bg-white border rounded-md text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("Plus")}
                  className="px-3 py-1 bg-white border rounded-md text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-orange-500 text-white py-2 px-6 rounded-md w-full mt-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-orange-400"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* Features */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {similarProducts?.length > 0 ? (
          <div className="mt-20">
            <h2 className="text-3xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts || []} />
          </div>
        ) : (
          <p className="mt-20 text-center">No similar products found.</p>
        )}
      </div>
      )}
    </div>
  );
};

export default ProductDetails;