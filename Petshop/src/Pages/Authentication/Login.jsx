/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toppage from "../../Components/Toppage";
import InputField from "../../Components/InputField";
import useAuthStore from "../Store/useAuthStore";

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const success = await login(emailOrPhone, password);
    if (success) navigate("/"); // ✅ Navigate if login is successful
    else setError("Invalid credentials. Please try again.");
  };

  return (
    <>
      <Toppage pagename="Login" />
      <section className="account py-120">
        <div className="account-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-none d-lg-block">
                <div className="account-thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/login-img.png"
                    alt="Login"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="account-form">
                  <div className="account-form__content mb-4">
                    <h3 className="account-form__title mb-2">
                      Sign In Your Account
                    </h3>
                    <p className="account-form__desc">
                      Login using your email or phone number.
                    </p>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <form onSubmit={handleLogin}>
                    <div className="row">
                      {/* Email or Phone */}
                      <div className="col-sm-12">
                        <InputField
                          label="Email"
                          type="email"
                          id="emailOrPhone"
                          placeholder="Enter Email"
                          value={emailOrPhone}
                          onChange={(e) => setEmailOrPhone(e.target.value)}
                        />
                      </div>

                      {/* Password */}
                      <div className="col-sm-12">
                        <InputField
                          label="Password"
                          type="password"
                          id="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="col-sm-12">
                        <div className="d-flex flex-wrap justify-content-between">
                          <div className="form--check form-group">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link
                            to="/forgot-password"
                            className="forgot-password text--base"
                          >
                            Forgot Your Password?
                          </Link>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-sm-12">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn--base w-100"
                            disabled={!isChecked}
                          >
                            Sign In
                          </button>
                        </div>
                      </div>

                      {/* Registration Link */}
                      <div className="col-sm-12">
                        <div className="have-account text-center">
                          <p className="have-account__text">
                            Don't Have An Account?{" "}
                            <Link
                              to="/registration"
                              className="have-account__link text--base"
                            >
                              Create Account
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

export default Login;
