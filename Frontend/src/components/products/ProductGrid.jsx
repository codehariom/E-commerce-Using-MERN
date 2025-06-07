import React from "react";
import { Link } from "react-router-dom";

function ProductGrid({ product }) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {product.map((product, index) => (
        <Link key={index} to={`/product/${product.id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.img[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
                <h3 className=" text-sm  mb-2 ">{product.name}</h3>
                <p className=" text-gray-500 font-medium text-sm">${product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
