import { useEffect } from "react";
import Toppage from "../../Components/Toppage";

import { Link, useNavigate } from "react-router-dom";

import useCartStore from "../Store/useCartStore";
import toast from "react-hot-toast";
function Cart() {
  const { cart, fetchCart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = () => {
    if (cart?.items.length > 0) {
      localStorage.setItem("cartData", JSON.stringify(cart));
      navigate("/checkout");
    } else {
      toast.success("Your cart is empty!");
    }
  };
  return (
    <>
      <Toppage pagename="Your Shoping Cart" />
      <div className="cart-section py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h3 className="section-heading__title style-two">
                  Your Cart Items
                  <span className="section-heading__bars"></span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table--responsive--lg cart-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Until Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                      <tr key={item._id}>
                        <td data-label="Product Name">
                          <div className="customer">
                            <div className="customer__thumb">
                              {item.product.image?.[0] ? (
                                <img
                                  src={item.product.image[0]}
                                  alt={item.product.description}
                                />
                              ) : (
                                <span>No Image</span> // Fallback if no image exists
                              )}
                            </div>
                            <div className="customer__content">
                              <h6 className="customer__name">
                                {item.product.name}
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td data-label="Unit Price">₹{item.price}</td>
                        <td data-label="Qty">{item.quantity}</td>
                        <td data-label="Subtotal">
                          ₹{item.price * item.quantity}
                        </td>
                        <td data-label="Delete">
                          <button
                            className="delete-icon"
                            onClick={() => removeFromCart(item.product._id)}
                          >
                            <i className="las la-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No items in cart
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cart-btn-area d-flex justify-content-between flex-wrap">
            <div className="shopping-cart mb-0">
              <Link
                to="/"
                className="btn btn--base pill shopping-cart__pr mb-3"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="order-summery ms-auto">
                <div className="order-summery__one d-flex justify-content-between">
                  <h6 className="order-summery__title"> Subtotal </h6>
                  <span className="order-summery__number">₹{cart?.total}</span>
                </div>
                <div className="order-summery__two d-flex justify-content-between">
                  <h6 className="order-summery__title-two"> Grand Total : </h6>
                  <span className="order-summery__number-two">
                    ₹{cart?.total}
                  </span>
                </div>
                <div className="checkout">
                  <button
                    onClick={handleCheckout}
                    className="btn btn--base pill"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                  <p className="checkout__desc">
                    Checkout With Multiple Addresses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
