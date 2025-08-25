import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/cartSlice";

function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // Debug cart prop
//   console.log("CartContent - Cart:", { cart, userId, guestId });

  // Increase or decrease item quantity
  const handleToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = (quantity || 0) + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="space-y-4">
      {cart && cart.products && cart.products.length > 0 ? (
        cart.products.map((product) => (
          <div
            key={`${product.productId}-${product.size}-${product.color}`}
            className="flex items-start justify-between border-b py-4"
          >
            <div className="flex items-start">
              <img
                src={product.image }
                alt={product.name }
                className="mr-5 h-20 w-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {product.name || "Unknown Product"}
                </h3>
                <p className="text-sm text-gray-600">
                  Size: {product.size || "N/A"} | Color: {product.color || "N/A"}
                </p>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={() =>
                      handleToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="rounded border px-2 py-0.5 text-xl font-medium disabled:opacity-50"
                    disabled={(product.quantity || 0) <= 1}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{product.quantity || 0}</span>
                  <button
                    onClick={() =>
                      handleToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="rounded border px-2 py-0.5 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">
                ${(product.price || 0).toFixed(2)}
              </p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
                className="mt-3"
              >
                <MdDelete color="red" size={25} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items in the cart.</p>
      )}
    </div>
  );
}

export default CartContent;