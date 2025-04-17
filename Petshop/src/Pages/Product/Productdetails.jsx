import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartStore from "../Store/useCartStore";
import Serive from "../Home/Serive";
import Relatedproduct from "./Relatedproduct";

function Productdetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const {
    productDetails,
    loading,
    fetchProductDetails,
    addToCart,
    addToWishlist,
  } = useCartStore();

  useEffect(() => {
    if (id) fetchProductDetails(id);
  }, [id, fetchProductDetails]);
  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };
  const handleAddToCart = () => addToCart(id, quantity);
  const handleWishlistToggle = () => addToWishlist(id);
  useEffect(() => {
    if (productDetails) {
      setGalleryImages(productDetails.image || []);
      setSelectedImage(productDetails.image?.[0] || "");
    }
  }, [productDetails]);

  if (loading) return <div>Loading product details...</div>;
  if (!productDetails) return <div>Product not found.</div>;

  const colors =
    productDetails?.color
      ?.split(" ")
      .map((col) =>
        col.trim().startsWith("#") ? col.trim() : `#${col.trim()}`
      ) || [];

  return (
    <>
      <div className="product-details-section py-120">
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* Product Image Section */}
            <div className="col-lg-7 pe-lg-5">
              <div className="row align-items-center">
                <div className="col-lg-9 order-lg-2">
                  <div className="product-details__thumb">
                    <a
                      href="product-two-details.html"
                      className="product-details__image"
                    >
                      <img src={selectedImage} alt="Product" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 order-lg-1">
                  <ul className="product-details-gallery d-flex d-lg-block gap-1">
                    {galleryImages.map((img, index) => (
                      <li
                        key={index}
                        className="product-details-gallery__image"
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index}`}
                          onClick={() => setSelectedImage(img)}
                          style={{
                            cursor: "pointer",
                            border:
                              selectedImage === img ? "1px solid gray" : "none",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="col-lg-5">
              <div className="product-info">
                <h3 className="product-info__title">{productDetails.name}</h3>

                {/* Rating (Static for now, can be dynamic if rating is available) */}
                <ul className="product-info__rating mb-3">
                  {[...Array(4)].map((_, i) => (
                    <li key={i} className="product-info__rating-item">
                      <i className="fas fa-star"></i>
                    </li>
                  ))}
                  <li className="product-info__rating-item">
                    <i className="fas fa-star-half-alt"></i>
                  </li>
                  <li className="product-info__number">4.8</li>
                </ul>

                {/* Price with Discount */}
                <h6 className="product-info__price">
                  {" "}
                  <span className="product-item__price-new">
                    ₹{productDetails.price}
                  </span>{" "}
                  {productDetails.discountType === "percentDiscount"
                    ? `${productDetails.discountPercent}%`
                    : productDetails.discountType === "fixedDiscount"
                    ? `₹${productDetails.discountPrice} OFF`
                    : "0%"}
                </h6>

                <p className="product-info__desc">
                  {productDetails.description}
                </p>

                {/* Product Attributes */}
                {productDetails.size && (
                  <div className="product-style">
                    <span className="product-style__title">Size :</span>
                    <span className="product-style__size">
                      {productDetails.size}
                    </span>
                  </div>
                )}

                {productDetails.color && (
                  <div className="product-variation product-style">
                    <span className="product-style__title">Color :</span>
                    <div className="product-color__variant-wrapper">
                      <ul className="color-variant-list">
                        {colors.map((color, index) => (
                          <li
                            key={index}
                            className="color-variant-list__item"
                            style={{
                              backgroundColor: color,
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              border: "1px solid #ddd",
                              display: "inline-block",
                              marginRight: "5px",
                            }}
                          ></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="product-style">
                  <span className="product-style__title">Type :</span>
                  <span className="product-style__size">Dog Food</span>
                </div>

                {/* Quantity Selector */}
                <div className="qty-cart d-flex product-style">
                  <span className="product-style__title">QTY :</span>
                  <div className="product-qty">
                    <button
                      type="button"
                      className="product-qty__decrement"
                      onClick={() => handleQuantityChange("dec")}
                    >
                      <i className="las la-angle-down"></i>
                    </button>
                    <input
                      type="number"
                      className="product-qty__value"
                      value={quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      className="product-qty__increment"
                      onClick={() => handleQuantityChange("inc")}
                    >
                      <i className="las la-angle-up"></i>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="product-info__button">
                  <a href="#" className="btn btn--base pill product-info__link">
                    BUY NOW
                  </a>
                  <Link
                    to="#"
                    onClick={handleWishlistToggle}
                    className="product-info__heart product-info__link"
                  >
                    <i className="fas fa-heart"></i>
                  </Link>

                  {productDetails.stock === 0 ? (
                    <button
                      className="btn btn--danger pill product-info__link"
                      disabled
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <Link
                      to="#"
                      className="product-info__cart product-info__link"
                      onClick={handleAddToCart}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="tab-section pb-120">
        <div className="container">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              <p className="tab-desc">{productDetails.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Sections */}
      <Relatedproduct />

      <Serive />
    </>
  );
}

export default Productdetails;
