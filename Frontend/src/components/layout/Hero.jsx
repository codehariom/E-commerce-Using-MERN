import React from "react";
import heroPic from "/src/assets/heroPic.jpg";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className=" relative">
      <img
        src={heroPic}
        alt="HeroSection"
        className="w-full bg-black h-[500px] md:h[600px] lg:h[750px] object-cover object-top"
      />
      <div className=" absolute  bg-blackbg-opacity-90 inset-0 flex items-center justify-center">
        <div className=" text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl  font-bold  uppercase  mb-10">
            Vaction <br /> Ready
          </h1>
          <p className=" text-gray-200 text-sm  text-center md:text-center mb-10">
            Explore our Vaction Ready Outfits with fast wolrdwide shiping{" "}
          </p>
          <Link
            to="/"
            className="bg-orange-600 text-white px-6  py-2 rounded-lg text-lg">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
