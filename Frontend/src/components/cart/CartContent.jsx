import React from "react";
import { MdDelete } from "react-icons/md";

function CartContent() {
  const cartProduct = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 250,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "T-shirt",
      size: "S",
      color: "Green",
      quantity: 2,
      price: 350,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "L",
      color: "Red",
      quantity: 1,
      price: 550,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 4,
      name: "Shirt",
      size: "M",
      color: "Yellow",
      quantity: 1,
      price: 550,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 5,
      name: "Top wear",
      size: "M",
      color: "Red",
      quantity: 2,
      price: 250,
      image: "https://picsum.photos/200?random=1",
    },
  ];

  return (
    <div>
      {cartProduct.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className=" flex items-start">
            <img
              src={product.image}
              atl={product.name}
              className="w-20 h-20 object-cover mr-5 rounded-lg"
            />
            <div>
              <h3>{product.name}</h3>
              <p className=" text-sm text-gray-600">
                size:{product.size} | color: {product.color}
              </p>
              <div className=" flex  items-center mt-2 ">
                <button className=" border rounded px-2 py-0.5 text-xl font-medium">
                  -
                </button>
                <span className=" mx-4">{product.quantity}</span>
                <button className=" border rounded px-2 py-0.5 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p>${product.price.toLocaleString()}</p>
            <button className="mt-3">
              <MdDelete color="red" size={25} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContent;
