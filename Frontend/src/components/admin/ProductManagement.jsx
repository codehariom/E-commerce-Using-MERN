import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAdminProducts, fetchAdminProducts } from "../../redux/adminProductSlice";

function ProductManagement() {
  const dispatch = useDispatch(); // fixed typo
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteAdminProducts({ id })); // pass correct product id
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid gap-5 sm:flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Link
          to="/admin/new/product"
          className="bg-green-600 text-sm text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Create New Product
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 whitespace-nowrap font-medium">{product.name}</td>
                  <td className="p-4 whitespace-nowrap">${product.price}</td>
                  <td className="p-4 whitespace-nowrap">{product.sku}</td>
                  <td className="p-4 whitespace-nowrap flex gap-4">
                    <Link
                      to={`${product._id}/edit`}
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)} // pass correct id
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-400 font-medium"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;