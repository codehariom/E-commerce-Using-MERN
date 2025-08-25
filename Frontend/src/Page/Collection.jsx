import React, { useEffect, useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";
import SortOption from "../components/products/SortOption";
import { useParams, useSearchParams } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilter } from "../redux/productSlice";

function Collection() {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { collection } = useParams();
  const [searchParams] = useSearchParams(); 
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);



  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    dispatch(fetchProductByFilter({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter */}
      <button
        onClick={toggle}
        className="lg:hidden border rounded m-2 p-3 flex justify-center items-center"
      >
        <IoFilterOutline size={25} className="mr-2" /> Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-65 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="mx-4 text-xl uppercase my-4">All Collection</h2>
        {/* sort option */}
        <SortOption />
        {/* product grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default Collection;
