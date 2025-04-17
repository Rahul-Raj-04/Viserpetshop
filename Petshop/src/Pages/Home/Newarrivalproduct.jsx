import { useEffect,  } from "react";

import ProductCard from "./ProductCard";
import useCartStore from "../Store/useCartStore";
import { useState } from "react";

function Newarrivalproduct() {
  const { products, fetchProducts } = useCartStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    fetchProducts(); // ✅ Fetch all products on page load
  }, [fetchProducts]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category?.name === selectedCategory)
      );
    }
  }, [selectedCategory, products]);
  return (
    <>
       <div className="new-arrival-section py-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h4 className="section-heading__subtitle">Special products</h4>
                <h3 className="section-heading__title style-two">
                  New Arrivals product
                  <span className="section-heading__bars"></span>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="filter">
              <button
                type="button"
                className={selectedCategory === "all" ? "mixitup-control-active" : ""}
                onClick={() => setSelectedCategory("all")}
               
              
              >
                All
              </button>
              <button type="button"   className={selectedCategory === "Cat" ? "mixitup-control-active" : ""}
                onClick={() => setSelectedCategory("Cat")}>
                Cat
              </button>
              <button type="button"   className={selectedCategory === "pet" ? "mixitup-control-active" : ""}
                onClick={() => setSelectedCategory("pet")}>
                Dog food
              </button>
              <button type="button"  className={selectedCategory === "fish" ? "mixitup-control-active" : ""}
                onClick={() => setSelectedCategory("fish")}>
                Small Pet
              </button>
            </div>
          </div>

          <div className="product">
          <div className="row justify-content-center gy-4">
          {filteredProducts.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No dog food products found.</p>
          )}
        </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Newarrivalproduct
