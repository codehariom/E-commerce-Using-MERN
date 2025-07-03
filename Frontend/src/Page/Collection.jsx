import React, { useEffect, useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";
import SortOption from "../components/products/SortOption";

function Collection() {
  const [product, setProduct] = useState([]);
  const sidebarRef = useRef(null)
  const [ isSidebarOpen , setIsSidebarOpen]= useState(false)

  const toggle = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
      setIsSidebarOpen(false)
    }
  }

  useEffect(()=>{
    // add event linstner for click 
    document.addEventListener("mousedown", handleClickOutside)
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside)   
    }
    
  },[])


  useEffect(() => {
    setTimeout(() => {
      const placeholderProduct = [
        {
          id: 1,
          name: "T-shirt",
          price: 250,
          img: [
            {
              url: "https://picsum.photos/200?random=12",
            },
          ],
        },
        {
          id: 2,
          name: "Shirt",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/200?random=13",
            },
          ],
        },
        {
          id: 3,
          name: "Top",
          price: 350,
          img: [
            {
              url: "https://picsum.photos/200?random=14",
            },
          ],
        },
        {
          id: 4,
          name: "Saree",
          price: 550,
          img: [
            {
              url: "https://picsum.photos/200?random=15",
            },
          ],
        },
        {
          id: 6,
          name: "T-shirt",
          price: 250,
          img: [
            {
              url: "https://picsum.photos/200?random=16",
            },
          ],
        },
        {
          id: 7,
          name: "Shirt",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/200?random=17",
            },
          ],
        },
        {
          id: 8,
          name: "Top",
          price: 350,
          img: [
            {
              url: "https://picsum.photos/200?random=18",
            },
          ],
        },
        {
          id: 9,
          name: "Saree",
          price: 550,
          img: [
            {
              url: "https://picsum.photos/200?random=19",
            },
          ],
        },
      ];
      setProduct(placeholderProduct)
    },1000);
  });
  return <div className=" flex flex-col lg:flex-row">
    {/* mobile fillter  */}
    <button onClick={toggle} className=" lg:hidden border rounded   m-2  p-3 flex justify-center items-center">
      <IoFilterOutline size={25} className="mr-2"/> Filters 
    </button>
    {/* Filter sidebar  */}
     <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}  fixed inset-y-0 z-50  left-0 w-65 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}>
      <FilterSidebar/>
     </div>
     <div className=" flex-grow p-4">
      <h2 className="  mx-4 text-xl uppercase my-4 ">All Collection </h2>
      {/* sort option  */}
      <SortOption/>
      {/* product grid  */}
      <ProductGrid product={product}/>
     </div>
  </div>;
}

export default Collection;
