import React from "react";
import { Link } from "react-router-dom";

const ProductsGrid = ({ products = [], loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <Link
            key={product._id || product.id}
            to={`/products/${product._id || product.id}`}
            className="block"
          >
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-gray-500 font-semibold text-lg">${product.price}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductsGrid;
