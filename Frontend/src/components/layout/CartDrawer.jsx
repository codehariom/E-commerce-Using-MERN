import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartDrawer({ cartDrawer, toggleCartDrawer }) {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate(user ? "/checkout" : "/login?redirect=checkout");
  };

  const hasItems = cart && cart?.products?.length > 0;

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-full w-3/4 transform flex-col bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-[25rem] ${
        cartDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose size={30} className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="mb-4 text-xl font-semibold">Your Cart</h2> 
        {hasItems ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="sticky bottom-0 bg-white p-4">
        {hasItems && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-orange-300 py-3 font-semibold text-black transition hover:bg-orange-600 hover:text-white"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-sm tracking-tight text-gray-400">
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;