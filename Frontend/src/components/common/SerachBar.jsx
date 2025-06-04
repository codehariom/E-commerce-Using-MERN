import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function SerachBar() {
  const [serachTerm, setSearchTerm] = useState("");
  const [isopen, setIsOpen] = useState(false);

  const handleSaerchToggle = () => {
    setIsOpen(!isopen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search item", serachTerm);
    setIsOpen(!isopen);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isopen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto "
      }`}
    >
      {isopen ? (
        <form
          onSubmit={handleSearch}
          className=" relative flex items-center justify-center w-full"
        >
          <div className=" relative w-1/2 ">
            <input
              type="text"
              placeholder="Search"
              value={serachTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-200 px-4 pl-2 pr-12 py-2 rounded-lg focus:outline-none w-full"
            />
            {/* serch icon  */}
            <button
              type="submit"
              className="right-4  absolute top-2.5 text-gray-600 transform -translate-y-0.5 "
            >
              <IoSearch size={25} />
            </button>
          </div>
          {/* close button  */}
          <button
            type="submit"
            onClick={handleSaerchToggle}
            className=" absolute right-10 text-gray-600 hover:text-black top-1/2 transform -translate-y-1/2 "
          >
            <IoMdClose size={30} />
          </button>
        </form>
      ) : (
        <button onClick={handleSaerchToggle}>
          <IoSearch size={25} />
        </button>
      )}
    </div>
  );
}

export default SerachBar;
