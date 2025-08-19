import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
// import {instance} from "../../services/axiosApi"
import axios from "axios";

function NewArrivals() {
    const scrollRef = useRef(null);
    const [isDraging, setIsDraging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
                );
                // console.log("New arrivals:", response.data); //  check structure here
                setNewArrivals(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDraging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDraging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handelMouseUpOrLeave = () => {
        setIsDraging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -400 : 400;
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
            return () =>
                container.removeEventListener("scroll", updateScrollButton);
        }
    }, [newArrivals]);

    return (
        <section className="px-4 py-5 lg:px-0">
            <div className="relative container mx-auto mb-20 text-center">
                <h2 className="mb-4 text-3xl font-bold">
                    {" "}
                    Explore New Arrivals
                </h2>
                <p className="mb-8 text-lg text-gray-500 capitalize">
                    Discover the Latest styles staright off the runway
                </p>
                {/* Scroll Button  */}
                <div className="absolute right-0 bottom-[-65px] flex space-x-10 scroll-smooth">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`rounded-lg border p-2 ${
                            canScrollLeft
                                ? "bg-white text-black"
                                : "cursor-not-allowed bg-white text-gray-400"
                        }`}
                    >
                        <FaArrowLeft size={25} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className={`rounded-lg border p-2 ${
                            canScrollRight
                                ? "bg-white text-black"
                                : "cursor-not-allowed bg-white text-gray-400"
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
                className="relative container mx-auto flex space-x-4 overflow-x-scroll"
            >
                {newArrivals.map((product) => (
                    <div
                        key={product._id}
                        className="relative min-w-[100%] scroll-smooth sm:min-w-[50%] lg:min-w-[30%]"
                    >
                        <img
                            className="w-full rounded-xl object-cover"
                            draggable="false"
                            src={
                                product.images?.[0]?.url || // if array of objects
                                product.images || // if single string
                                product.images?.[0] || // if backend sends images array
                                "/placeholder.png" // fallback
                            }
                            alt={product.altText || product.name}
                        />
                        <div className="absolute right-0 bottom-0 left-0 rounded-b-lg bg-white p-4 text-black opacity-80 backdrop-blur-sm">
                            <Link
                                to={`/product/${product.productId}`}
                                className="block"
                            >
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="mt-1">${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NewArrivals;
