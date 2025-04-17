import { useEffect } from "react";
import ProductCard from "./ProductCard";

import useCartStore from "../Store/useCartStore";

function SpecialProduct() {
  const { products, fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts(); // ✅ Fetch all products on page load
  }, [fetchProducts]);

  return (
    <div className="product-section py-60">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading">
              <h4 className="section-heading__subtitle">Special products</h4>
              <h3 className="section-heading__title style-two">
                Trending Products
                <span className="section-heading__bars"></span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center gy-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No dog food products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialProduct;
