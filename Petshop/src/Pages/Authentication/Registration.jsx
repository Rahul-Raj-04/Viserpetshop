/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Toppage from "../../Components/Toppage";
import InputField from "../../Components/InputField";
import { useState } from "react";
import { Baseurl } from "../../Config";

function Registration() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Sending Data:", formData); // Debugging

    try {
      setLoading(true);
      const response = await fetch(Baseurl+"user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Please log in.");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsChecked(false);
      } else {
        // Show API error message if available, else show a generic message
        setError(result.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toppage pagename="Registration" />
      <section className="account py-120">
        <div className="account-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-none d-lg-block">
                <div className="account-thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/login-img.png"
                    alt="Registration"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="account-form">
                  <div className="account-form__content mb-4">
                    <h3 className="account-form__title mb-2">
                      Sign Up Your Account
                    </h3>
                    <p className="account-form__desc">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <InputField
                          label="Full Name"
                          type="text"
                          id="fullName"
                          placeholder="Full Name"
                          value={formData.fullName} // Pass value from state
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <InputField
                          label="Mobile Number"
                          type="number"
                          id="phone"
                          placeholder="Mobile Number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-12">
                        <InputField
                          label="Email Address"
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <InputField
                          label="Password"
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <InputField
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-sm-12">
                        <div className="form--check form-group">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agree"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor="agree">
                            I agree with{" "}
                            <Link to="/terms" className="text--base">
                              Terms of Service
                            </Link>
                            ,{" "}
                            <Link to="/privacy-policy" className="text--base">
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn--base w-100"
                            disabled={!isChecked || loading}
                          >
                            {loading ? "Registering..." : "Sign Up"}
                          </button>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="have-account text-center">
                          <p className="have-account__text">
                            Already Have An Account?{" "}
                            <Link
                              to="/login"
                              className="have-account__link text--base"
                            >
                              Login Now
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
