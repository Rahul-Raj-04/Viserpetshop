import { useEffect } from "react";
import useCartStore from "../Store/useCartStore";
import Toppage from "../../Components/Toppage";

import { useLocation } from "react-router-dom";
import Card from "./Card";

function SearchPage() {
  const query = new URLSearchParams(useLocation().search).get("q");
  const { products, fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts(); // ✅ Fetch all products on page load
  }, [fetchProducts]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase() || "")
  );
  return (
    <>
      <Toppage pagename={"Product Category"} />
      <div className="product-category-two py-120 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-sidebar-filter d-lg-none d-block">
                <button className="product-sidebar-filter__button">
                  <i className="las la-filter"></i>
                  <span className="text"> Filter </span>
                </button>
              </div>
              <div className="row justify-content-center gy-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))
                ) : (
                  <p>No products found for {query}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
