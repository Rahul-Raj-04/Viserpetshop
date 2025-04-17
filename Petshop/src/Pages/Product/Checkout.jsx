import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import InputField from "../../Components/InputField";
import Toppage from "../../Components/Toppage";
import Serive from "../Home/Serive";

import usePaymentStore from "../Store/usePaymentStore";

function Checkout() {
  const navigate = useNavigate();
  const { handleCheckout } = usePaymentStore();
  const [cartData, setCartData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "COD",
    termsAccepted: false,
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    setCartData(storedCart ? JSON.parse(storedCart) : null);
  }, []);

  const handleChange = (e) => {
    const { name, id, value, type, checked } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [type === "checkbox" ? id : name || id]: type === "checkbox" ? checked : value.trim(),
    }));
  };
  
  

  return (
    <>
      <Toppage pagename="Check Out" />
      <div className="checkout-section py-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="billing-details">
                <h5 className="billing-details__title">Billing Details</h5>
                <div className="row">
                  {[
                    {
                      label: "Full Name*",
                      type: "text",
                      id: "fullName",
                      placeholder: "Enter your full name",
                    },
                    {
                      label: "Phone Number*",
                      type: "number",
                      id: "phoneNumber",
                      placeholder: "Enter your phone number",
                    },
                    {
                      label: "Email*",
                      type: "email",
                      id: "email",
                      placeholder: "Enter your email",
                    },
                    {
                      label: "Postal Code*",
                      type: "number",
                      id: "postalCode",
                      placeholder: "Enter postal code",
                    },
                    {
                      label: "Address*",
                      type: "text",
                      id: "address",
                      placeholder: "Enter your address",
                    },
                  ].map(({ label, ...inputProps }) => (
                    <div key={inputProps.id} className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor={inputProps.id} className="form--label">
                          {label}
                        </label>
                        <InputField
                          {...inputProps}
                          value={formData[inputProps.id]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  {[
                    { label: "City*", id: "city", options: ["Noida", "Delhi"] },
                    { label: "State*", id: "state", options: ["UP", "Delhi"] },
                  ].map(({ label, id, options }) => (
                    <div key={id} className="col-lg-6">
                      <label htmlFor={id} className="form--label">
                        {label}
                      </label>
                      <select
                        className="select form--control"
                        id={id}
                        value={formData[id]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose {label.split("*")[0]}</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="ordernote" className="form--label">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        className="form--control"
                        id="ordernote"
                        rows="3"
                        placeholder="Type your note"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="your-order">
                <h6 className="your-order__title">Your Order</h6>

                {cartData?.items.map(({ _id, product, price, quantity }) => (
                  <div
                    key={_id}
                    className="order d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {product.description} - ₹{price} x {quantity}
                    </span>
                  </div>
                ))}

                <div className="order d-flex justify-content-between align-items-center">
                  <span>Subtotal</span>
                  <span className="order__number">₹{cartData?.total}</span>
                </div>

                <div className="order-system">
                {["PhonePe", "Razorpay", "COD"].map((method) => (
                    <div key={method} className="form--radio mb-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        id={method}
                        value={method} // ✅ Correct
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={method}>
                        {method}
                      </label>
                    </div>
                  ))}
                </div>

                <p className="your-order__desc">
                  Your personal data will be used to process your order and
                  support your experience throughout this website.
                  <Link to="/" className="your-order__desc-link">
                    {" "}
                    Privacy policy.
                  </Link>
                </p>

                <div className="form--check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="termsAccepted">
                    I agree to the{" "}
                    <Link to="/privacy" className="order-system__link m-1">
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <div className="place-order">
                  <button
                    onClick={() => handleCheckout(cartData, formData, navigate)}
                    className="btn btn--base pill"
                    disabled={!formData.termsAccepted}
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Serive />
    </>
  );
}

export default Checkout;
