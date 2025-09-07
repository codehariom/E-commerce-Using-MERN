import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../redux/orderSlice";

function OrderDetails() {
  const { id } = useParams();

  const dispatch = useDispatch()
  const {orderDetails ,loading,error} = useSelector((state)=>state.orders)
  useEffect(()=>{ 
  dispatch(fetchOrderById(id))
},[dispatch,id])

if(loading) return <p className="text-center">Loading...</p>
if(error) return <p className=" text-center">error...</p>



  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order details found</p>
      ) : (
        <div className="p-4 sm:p-6 space-x-1 rounded-lg border">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order Id #{orderDetails._id}
              </h3>
              <p className="text-gray-400">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "text-green-700 bg-green-200"
                    : "bg-red-600 text-white"
                } px-3 py-2 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "text-green-700 bg-green-200"
                    : "bg-yellow-400 text-black"
                } px-3 py-2 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Not Delivered"}
              </span>
            </div>
          </div>

          {/* Payment and Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.paymentMethod}</p>
              <p>
                Address: {"" }
                {`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.postalCode}`}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItem.map((item) => (
                  <tr key={item.productId} className="text-center border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.images}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4 font-semibold">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Link */}
          <Link
            to="/my-order"
            className="text-white bg-orange-500 mt-10 rounded py-2 px-4 inline-block"
          >
            Back To Orders
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
