import { useEffect } from "react";
import Toppage from "../../Components/Toppage";
import Serive from "../Home/Serive";
import useCartStore from "../Store/useCartStore";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, fetchWishlist, removeFromWishlist, addToCart } =
    useCartStore();

  // Fetch wishlist when component mounts
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);
  return (
    <>
      <Toppage pagename="Wishlist" />
      <div className="cart-section py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h3 className="section-heading__title style-two">
                  Wishlist <span className="section-heading__bars"></span>
                </h3>
              </div>
            </div>
          </div>
          {wishlist.length === 0 ? (
            <h4 className="text-center">Your Wishlist is Empty</h4>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <table className="table table--responsive--lg cart-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Until Price</th>
                      <th>Delete</th>
                      <th> Add to Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((product) => (
                      <tr key={product._id}>
                        <td data-label="Product Name">
                          <div className="customer">
                            <div className="customer__thumb">
                              <img src={product.image?.[0]} alt={product.name} />
                            </div>
                            <div className="customer__content">
                              <h6 className="customer__name">{product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td data-label="Price">₹{product.price}</td>
                        <td data-label="Delete">
                          <button
                            type="button"
                            className="delete-icon"
                            onClick={() => removeFromWishlist(product._id)}
                          >
                            <i className="las la-trash-alt"></i>
                          </button>
                        </td>
                        <td data-label="Cart">
                          <button
                            className="btn btn--base"
                            onClick={() => {
                              addToCart(product._id);
                            }}
                          >
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="cart-btn-area d-flex justify-content-between flex-wrap">
            <div className="shopping-cart mb-0">
              <Link
                to="/"
                className="btn btn--base pill shopping-cart__pr mb-3"
              >
                CONTINUE SHOPPING
              </Link>
              <Link to="#" className="btn btn--white pill shopping-cart mb-3">
                UPDATE SHOPPING CART
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Serive />
    </>
  );
}

export default Wishlist;
