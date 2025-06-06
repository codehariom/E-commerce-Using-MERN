import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewArrivals() {
  const scrollRef = useRef(null);
  const [isDraging, setIsDraging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(true);

  const Product = [
    {
      productId: 1,
      name: "T-shirt",
      price: 250,
      image: [
        { Url: "https://picsum.photos/200?random=1", altText: "T-shirt" },
      ],
    },
    {
      productId: 2,
      name: "T-shirt",
      price: 350,
      image: [
        { Url: "https://picsum.photos/200?random=2", altText: "T-shirt" },
      ],
    },
    {
      productId: 3,
      name: "T-shirt",
      price: 550,
      image: [
        { Url: "https://picsum.photos/200?random=3", altText: "T-shirt" },
      ],
    },
    {
      productId: 4,
      name: "Shirt",
      price: 550,
      image: [{ Url: "https://picsum.photos/200?random=4", altText: "Shirt" }],
    },
    {
      productId: 5,
      name: "Jeans",
      price: 250,
      image: [{ Url: "https://picsum.photos/200?random=5", altText: "Jeans" }],
    },
    {
      productId: 6,
      name: "Shirt",
      price: 550,
      image: [{ Url: "https://picsum.photos/200?random=6", altText: "Shirt" }],
    },
    {
      productId: 7,
      name: "Half Shirt",
      price: 250,
      image: [
        { Url: "https://picsum.photos/200?random=7", altText: "Half Shirt" },
      ],
    },
    {
      productId: 8,
      name: "Shirt",
      price: 550,
      image: [{ Url: "https://picsum.photos/200?random=8", altText: " Shirt" }],
    },
    {
      productId: 9,
      name: "Top wear",
      price: 250,
      image: [
        { Url: "https://picsum.photos/200?random=9", altText: "Top wear" },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDraging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };  

  const handleMouseMove = (e) => {
    if (!isDraging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = screenLeft - walk;
  };

  const handelMouseUpOrLeave = ()=>{
    setIsDraging(false)
  }

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScroll =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScroll);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton();
      return () => container.removeEventListener("scroll", updateScrollButton);
    }
  },[scrollLeft]);

  return (
    <section className=" py-5 px-4 lg:px-0">
      <div className=" container mx-auto text-center mb-20 relative">
        <h2 className=" text-3xl font-bold mb-4"> Explore New Arrivals</h2>
        <p className=" text-lg text-gray-500 mb-8 capitalize">
          Discover the Latest styles staright off the runway
        </p>
        {/* Scroll Button  */}
        <div className=" absolute  right-0 bottom-[-65px] flex space-x-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg  border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-white text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded-lg  border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-white text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      {/* Product Display  */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handelMouseUpOrLeave}
        className="container mx-auto overflow-x-scroll flex space-x-4 relative" 
      >
        {Product.map((Product) => (
          <div
            key={Product.productId}
            className=" min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              className="w-full object-cover rounded-xl"
              draggable="false"
              src={Product.image[0]?.Url}
              alt={Product.altText || Product.name}
            />
            <div className=" absolute bottom-0 left-0 right-0 opacity-90 backdrop-blur-sm text-white p-4 rounded-b-lg">
              <Link to={`/product/${Product.productId}`} className="block">
                <h4 className=" font-medium">{Product.name}</h4>
                <p className=" mt-1">${Product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
