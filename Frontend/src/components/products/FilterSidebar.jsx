import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterSidebar() {
  const [searchParameter] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
     console.log({name, value, checked, type})

    setFilters((prev) => {
      if (type === "checkbox") {
        const list = prev[name];
        if (checked) {
          return { ...prev, [name]: [...list, value] };
        } else {
          return { ...prev, [name]: list.filter((item) => item !== value) };
        }
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParameter]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseInt(params.minPrice) || 0,
      maxPrice: parseInt(params.maxPrice) || 100,
    });
    setPriceRange([
      parseInt(params.minPrice) || 0,
      parseInt(params.maxPrice) || 100,
    ]);
  }, [searchParameter]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Gray", "White", "Navy", "Black"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyster", "Silk", "Linen", "Fleece"];
  const brands = ["Urban Thread", "Modern Fit", "Street Style", "Fashionista"];
  const genders = ["Men", "Women"];

  return (
    <div className="p-7">
      <h3 className=" font-medium text-2xl text-gray-600 mb-6">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 border-black"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      {/* Color Filter */}
<div className="mb-6">
  <label className="block text-black font-medium mb-2">Color</label>
  <div className="flex flex-wrap gap-3">
    {colors.map((color) => (
      <label key={color} className="cursor-pointer">
        <input
          type="radio"
          name="color"
          value={color}
          onChange={handleFilterChange}
          checked={filters.color === color}
          className="sr-only"
        />
        <span
          className={`inline-block h-8 w-8 rounded-full border-2 transition-transform duration-150 ${
            filters.color === color ? "border-black scale-110" : "border-gray-200"
          }`}
          style={{ backgroundColor: color.toLowerCase() }}
        ></span>
      </label>
    ))}
  </div>
</div>


      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 border-black"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 border-black"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 border-black"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 border-black"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price</label>
        <div className="flex gap-3 items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => {
              const max = parseInt(e.target.value);
              setPriceRange([priceRange[0], max]);
              setFilters((prev) => ({ ...prev, maxPrice: max }));
            }}
            className="w-full "
          />
          <span className="text-gray-700">{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
