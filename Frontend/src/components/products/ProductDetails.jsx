import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectProduct = {
  name: "Stylish Jacket",
  price: 450,
  originalPrice: 650,
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam eos rerum minus",
  brand: "StylePop",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black", "Green"],
  images: [
    {
      url: "https://picsum.photos/200?random=10",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/200?random=11",
      altText: "Stylish Jacket 1",
    },
  ],
};


const similarProduct =[
    {
        id:1,
        name:"T-shirt",
        price:250,
        img:[{
            url:"https://picsum.photos/200?random=12"
        }]
    },
    {
        id:2,
        name:"Shirt",
        price:150,
        img:[{
            url:"https://picsum.photos/200?random=13"
        }]
    },
    {
        id:3,
        name:"Top",
        price:350,
        img:[{
            url:"https://picsum.photos/200?random=12"
        }]
    },
    {
        id:4,
        name:"Saree",
        price:550,
        img:[{
            url:"https://picsum.photos/200?random=12"
        }]
    },
]

function ProductDetails() {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectProduct?.images?.length > 0) {
      setMainImage(selectProduct.images[0].url);
    }
  }, []);

  const handleQunatityChange = (action) => {
    if (action === "Plus") setQuantity((prev) => prev + 1);
    if (action === "Minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handelAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart ", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart !", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6 ">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className=" flex flex-col md:flex-row">
          {/* Left thumbnail  */}
          <div className=" hidden md:flex flex-col space-y-4 mr-6">
            {selectProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "Thumbnail"}
                className={`w-25 h-25 object-cover object-top rounded-lg cursor-pointer  border ${
                  mainImage === image.url
                    ? "border-black border-2 "
                    : "border-gray-600"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* main image  */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={selectProduct.altText}
                className=" w-full h-auto object-cover border-2 rounded-lg"
              />
            </div>
          </div>
          {/* Mobile thumnail  */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4  ">
            {selectProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "Thumbnail"}
                className={`w-25 h-25 object-cover object-top rounded-lg cursor-pointer  border ${
                  mainImage === image.url
                    ? "border-black border-2 "
                    : "border-gray-600"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* right side product details  */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className=" text-2xl md:text-3xl font-semibold mb-4">
              {selectProduct.name}
            </h1>
            <div className=" flex space-x-5 text-center">
              <p className=" text-2xl text-gray-400 line-through">
                {" "}
                ${" "}
                {selectProduct.originalPrice &&
                  `${selectProduct.originalPrice}`}
              </p>
              <p className="text-2xl text-black mb-5 font-semibold ">
                $ {selectProduct.price}
              </p>
            </div>
            <p className=" text-gray-500 mb-4"> {selectProduct.description}</p>
            <div>
              <p className=" text-gray-700"> color </p>
              <div className=" flex gap-2 mb-2">
                {selectProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 mt-1 rounded-full border ${
                      selectedColor === color
                        ? "border-3 border-black"
                        : "border-gray-400"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(1)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-b">
              <p className="text-gray-700">Size</p>
              <div className="flex gap-3 mb-4">
                {selectProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={()=>setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? "border-2  border-black"
                        : "border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className=" mt-4 ">
              <p className=" to-gray-700">Quanatity</p>
              <div className=" flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQunatityChange("Minus")}
                  className=" px-3 py-1 bg-white border rounded-md text-lg"
                >
                  -
                </button>
                <span className=" text-lg ">{quantity}</span>
                <button
                  onClick={() => handleQunatityChange("Plus")}
                  className=" px-3 py-1 bg-white border rounded-md text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handelAddToCart}
              disabled={isButtonDisabled}
              className= {`bg-orange-500 text-white py-2 px-6 rounded-md w-full mt-4 ${isButtonDisabled ? " cursor-not-allowed opacity-60":"hover:bg-orange-400"}`}
            >
              {isButtonDisabled ? "Adding..." :" Add to Cart " }
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className=" text-xl font-bold mb-4">Features</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand </td>
                    <td className="py-1">{selectProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material </td>
                    <td className="py-1">{selectProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
            <h2 className="text-3xl text-center font-medium mb-4"> You May Also Like</h2>
            <ProductGrid product={similarProduct}/>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
