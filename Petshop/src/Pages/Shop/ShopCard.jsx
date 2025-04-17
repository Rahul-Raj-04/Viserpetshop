import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../Store/useCartStore";

/* eslint-disable react/prop-types */
function ShopCard({ product }) {
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useCartStore((state) => state.addToWishlist);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(product._id, 1);
    setLoading(false);
  };
  const handleWishlistToggle = async () => {
    await addToWishlist(product._id, 1);
  };
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 col-xsm-6">
        <div className="product-item">
          <div className="product-item__thumb">
            <Link
              to={`/product/${product._id}`}
              className="product-item__thumb-link"
            >
              <img src={product.image[0]} alt={product.name} />
            </Link>
            <button
              className="product-item__icon"
              onClick={handleWishlistToggle}
            >
              <span className="product-item__icon-style">
                <i className="las la-heart"></i>
              </span>
            </button>
            {product.badge && (
              <div className="product-item__badge">
                <span className="badge badge--base">{product.badge}</span>
              </div>
            )}
          </div>
          <div className="product-item__content">
            <h5 className="product-item__title">
              <Link
                to={`/product/${product._id}`}
                className="product-item__title-link"
              >
                {product.name}
              </Link>
            </h5>
            <ul className="product-info__rating justify-content-center">
              {Array.from({ length: Math.floor(4) }).map((_, index) => (
                <li key={index} className="product-info__rating-item">
                  <i className="fas fa-star"></i>
                </li>
              ))}
              {product.rating % 1 !== 0 && (
                <li className="product-info__rating-item">
                  <i className="fas fa-star-half-alt"></i>
                </li>
              )}
              <li className="product-info__number">{product.rating}</li>
            </ul>
            <h6 className="product-item__price">
              <span className="product-item__price-new">₹{product.price}</span>{" "}
              {product.discountType === "percentDiscount"
                ? `${product.discountPercent}%`
                : product.discountType === "fixedDiscount"
                ? `₹${product.discountPrice} OFF`
                : "0%"}
            </h6>

            <button
              className="btn btn--base pill btn--sm"
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
            >
              {product.stock === 0
                ? "Out of Stock"
                : loading
                ? "Adding..."
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopCard;
