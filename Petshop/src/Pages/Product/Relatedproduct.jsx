
import AliceCarousel, { Link } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import useCartStore from "../Store/useCartStore";
import { useEffect } from "react";

function Relatedproduct() {
  const { products, fetchProducts } = useCartStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProducts(); // ✅ Fetch all products on page load
  }, [fetchProducts]);
  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };
  const handleWishlistToggle = (productId) => {
    addToCart(productId, 1);
  };
  // Map function se dynamic items generate karna
  const items = products.map((product) => (
    <div className="product-item" key={product.id}>
      <div className="product-item__thumb">
        <a href="product-two-details.html" className="product-item__thumb-link">
          <img src={product.image?.[0]} alt={product.name} />
        </a>
        <button className="product-item__icon"  onClick={() => handleWishlistToggle(product._id)}>
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
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));
  return (
    <div className="pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading style-two">
              <h4 className="section-heading__title style-two">
                Related Products
                <span className="section-heading__bars style-two"></span>
              </h4>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1024: { items: 4 },
            }}
            autoPlay
            autoPlayInterval={3000}
            infinite
            disableButtonsControls
            disableDotsControls
          />
        </div>
      </div>
    </div>
  );
}

export default Relatedproduct;
