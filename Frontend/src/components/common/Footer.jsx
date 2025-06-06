import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" space-y-4 border-t px-2 py-12">
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-4 gap-15 px-4 lg:px-0">
        <div className="space-y-3">
          <h3 className=" text-xl font-semibold text-gray-800 mb-4">
            Newletter
          </h3>
          <p className=" text-gray-500 mb-4">
            Be the first to hear about <br></br>new product and online offers
          </p>
          <p>Sign up and get 10% off your first order</p>
          {/* input field  */}
          <form action="" className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-3 w-[250px] text-sm border-t border-l border-b border-gray-300 rounded-l-md
                        focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className=" bg-orange-300 text-black px-6 py-3 text-sm rounded-r-md hover:bg-orange-500 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* shop link   */}
        <div>
          <h3 className=" text-lg font-semibold text-gray-800 mb-4"> Shop </h3>
          <ul className=" space-y-3 text-gray-600 ">
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Men's Top wear
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Women's Top wear
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Men's Bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Women's Bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/* support link  */}
        <div>
          <h3 className=" text-lg font-semibold text-gray-800 mb-4">
            {" "}
            Support{" "}
          </h3>
          <ul className=" space-y-3 text-gray-600 ">
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Link  */}
        <div>
          <h3 className=" font-semibold text-lg text-gray-800 mb-4">
            {" "}
            Follow Us{" "}
          </h3>
          <ul className=" space-y-3 text-gray-600 ">
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Instagram
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Youtube
              </Link>
            </li>
            <li>
              <Link to="#" className=" hover:text-black transition-colors">
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Footer bottom  */}
      <div className="container text-center mx-auto mt-12 px-4 lg:px-0  border-t border-gray-200 pt-6">
        <p> © 2025 All Copyright Reserved </p>
      </div>
    </footer>
  );
}

export default Footer;
