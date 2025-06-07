import React from "react";
import { Link } from "react-router-dom";
import group from "/src/assets/group.jpg";

function FeatureProduct() {
  return (
    <section className="py-15 px-5 lg:px-0">
      <div className=" container mx-auto flex flex-col-reverse lg:flex-row items-center bg-orange-400 rounded-3xl ">
        {/* left content  */}
        <div className=" lg:w-1/2 p-10 text-center lg:text-left ">
          <h2 className=" text-lg  mb-3 font-medium text-black">
            Comfort and Style
          </h2>
          <h2 className=" text-4xl lg:text-5xl font-semibold mb-6">
            Apparel made for Your everyday life
          </h2>
          <p className=" text-black text-lg mb-10">
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis nemo dolorum nesciunt quibusdam itaque, expedita iure
            eos assumenda, voluptatum repudiandae consequuntur eveniet doloribus
            ut nisi enim eligendi laudantium, aspernatur aliquam!
          </p>
          <Link
            to="/collection/all"
            className=" bg-black text-white px-6 py-3  mb-6 rounded-lg cursor-default text-lg "
          >
            Shop Now
          </Link>
        </div>

        {/* left content  */}
        <div className=" lg:w-1/2  ">
          <img
            src={group}
            alt="Group Pic"
            className="w-fit h-full object-cover lg:rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureProduct;
