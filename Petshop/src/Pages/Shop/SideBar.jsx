/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useCartStore from "../Store/useCartStore";

function Sidebar({ selectedCategories, handleCategoryChange,handlePriceFilter ,}) {
  const { categories, fetchCategories } = useCartStore();



  useEffect(() => {
    fetchCategories(); // ✅ Fetch categories on load
  }, [fetchCategories]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const handleMinPriceChange = (e) => {
    const newMin = Number(e.target.value);
    setMinPrice(newMin);
    handlePriceFilter(newMin, maxPrice); // ✅ Apply filter immediately
  };

  const handleMaxPriceChange = (e) => {
    const newMax = Number(e.target.value);
    setMaxPrice(newMax);
    handlePriceFilter(minPrice, newMax); // ✅ Apply filter immediately
  };
  
  return (
    <div className="col-lg-3">
      <div className="left-sidebar">
        <span className="close-sidebar d-lg-none d-block">
          <i className="las la-times"></i>
        </span>

        {/* Category Filter */}
        <div className="sidebar-item">
          <h6 className="sidebar-item__title">Category</h6>
          {categories.map((category, index) => (
            <div key={index} className="form-check form--check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`category-${index}`}
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              <label className="form-check-label" htmlFor="cadfood">
                {category.name}{" "}
              </label>
            </div>
          ))}
        </div>

        {/* Price Filter */}
        <div className="sidebar-item">
          <h5 className="sidebar-item__title">Filter by Price</h5>
          <div className="custom--range">
            <div  ><label>Min Price: ₹{minPrice}</label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={minPrice}
              onChange={handleMinPriceChange} // ✅ Filter applied instantly
              className="form-range"
            />

            <label>Max Price: ₹{maxPrice}</label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={handleMaxPriceChange} 
              className="form-range"
            /></div>
          
          </div>
          <div className="sidebar-item__button">
            <button  className="btn btn--base pill btn--sm" onClick={() => handlePriceFilter(minPrice, maxPrice)}>
              Clear
            </button>
          </div>
        </div>

        {/* Color Filter */}
        {/* <div className="sidebar-item">
          <h6 className="sidebar-item__title">Color</h6>
          {["Red", "Green", "Violet", "Blue", "Black"].map((color, index) => (
            <div key={index} className="form-check form--check">
              <input
                className="form-check-input"
                type="checkbox"
                id={color.toLowerCase()}
              />
              <label className="form-check-label" htmlFor={color.toLowerCase()}>
                {color}
              </label>
            </div>
          ))}
        </div> */}

        {/* Best Sellers */}
        {/* <div className="sidebar-item">
          <h6 className="sidebar-item__title">Best Seller</h6>
          {[
            {
              name: "Impulse Duffle",
              img: "arrival-two02.png",
              price: "₹210",
              newPrice: "₹150",
            },
            {
              name: "Driven Backpack",
              img: "tp04.png",
              price: "₹210",
              newPrice: "₹150",
            },
            {
              name: "Affirm Cat Food",
              img: "tp04.png",
              price: "₹210",
              newPrice: "₹150",
            },
          ].map((item, index) => (
            <div key={index} className="seller-item">
              <a href="#" className="seller-item__thumb">
                <img
                  src={`https://template.viserlab.com/viserpet/demos/assets/images/thumbs/${item.img}`}
                  alt={item.name}
                />
              </a>
              <div className="seller-item__title">
                <a href="#" className="seller-item__link">
                  {item.name}
                </a>
                <h6 className="seller-item__price">
                  {item.price}{" "}
                  <span className="seller-item__price-new">
                    {item.newPrice}
                  </span>
                </h6>
              </div>
            </div>
          ))}
        </div> */}

        {/* Brand Filter */}
        {/* <div className="sidebar-item">
          <h6 className="sidebar-item__title">Brand</h6>
          {["Red", "Petclub", "Brothers", "Cat", "Pet Point"].map(
            (brand, index) => (
              <div key={index} className="form-check form--check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={brand.toLowerCase()}
                />
                <label
                  className="form-check-label"
                  htmlFor={brand.toLowerCase()}
                >
                  {brand}
                </label>
              </div>
            )
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
