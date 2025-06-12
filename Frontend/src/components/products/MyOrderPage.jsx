import React, { useEffect, useState } from "react";
import { SlRefresh } from "react-icons/sl";

function MyOrderPage() {
  const [order, setOrder] = useState([]);

  // reloade the window
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      const demoOrder = [
        {
          id: "7310",
          createAt: new Date(),
          shipingAddress: { city: "Hydrabad", country: "India" },
          orderItem: [
            {
              name: "T-shirt",
              image: "https://picsum.photos/200?random=1",
            },
            {
              name: "T-shirt",
              image: "https://picsum.photos/200?random=3",
            },
            {
              name: "T-shirt",
              image: "https://picsum.photos/200?random=1",
            },
            {
              name: "T-shirt",
              image: "https://picsum.photos/200?random=1",
            },
          ],
          totalprice: 250,
          isPaid: true,
        },
        {
          id: "6310",
          createAt: new Date(),
          shipingAddress: { city: "Hydrabad", country: "India" },
          orderItem: [
            {
              name: "Shirt",
              image: "https://picsum.photos/200?random=2",
            },
          ],
          totalprice: 150,
          isPaid: false,
        },
      ];
      setOrder(demoOrder);
    }, 1000);
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">My Order</h2>
      <button
        onClick={handleRefresh}
        className=" flex items-center gap-3 py-2 mb-4 rounded px-3 bg-orange-200 hover:text-white  hover:bg-orange-500 "
      >
        <SlRefresh /> <span>Refresh Order</span>
      </button>
      <div className=" relative sm:rounded-lg overflow-auto">
        <table className=" min-w-full text-center text-black">
          <thead className="bg-orange-300 text-sm  capitalize text-black">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status </th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((order) => (
                <tr
                  key={order.id}
                  className=" border-b hover:border-r-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4 ">
                    <img
                      src={order.orderItem[0].image}
                      className="w-10 h-10 sm:h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className=" py-2 px-2 sm:py-4 sm:px-4  font-medium text-black whitespace-nowrap">
                    #{order.id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4  ">
                    {new Date(order.createAt).toLocaleDateString()}{" "}
                    {new Date(order.createAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {" "}
                    {order.shipingAddress
                      ? `${order.shipingAddress.city},${order.shipingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItem.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.totalprice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    <span
                      className={`${
                        order.isPaid ? "bg-green-300  " : "bg-red-300 "
                      } py-1 px-2 rounded  text-sm sm:text-sm`}
                    >
                      {" "}
                      {order.isPaid ? "Paid" : "Pending"}{" "}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className=" col-span-7 py-4 px-4 text-center text-gray-600">
                  You have no Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyOrderPage;
