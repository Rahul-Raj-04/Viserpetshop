import { useState } from "react";
import { Link } from "react-router-dom";
import Toppage from "../../Components/Toppage";
import InputField from "../../Components/InputField";
import useAuthStore from "../Store/useAuthStore";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await forgotPassword(email);
    if (success) {
      setEmail(""); // Clear input after success
    } else {
      toast.error("Failed to send reset link. Try again.");
    }

    setLoading(false);
  };
  return (
    <>
      <Toppage pagename="Forgot Password" />
      <section className="account py-120">
        <div className="account-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-none d-lg-block">
                <div className="account-thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/login-img.png"
                    alt="Forgot Password"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="account-form">
                  <div className="account-form__content mb-4">
                    <h3 className="account-form__title mb-2">
                      Reset Your Password
                    </h3>
                    <p className="account-form__desc">
                      Enter your email address to receive a password reset link.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <InputField
                          label="Email"
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <button type="submit" className="btn btn--base w-100">
                            {loading ? "Sending..." : "Send Reset Link"}
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="have-account text-center">
                          <p className="have-account__text">
                            Remember your password?{" "}
                            <Link
                              to="/login"
                              className="have-account__link text--base"
                            >
                              Sign In
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

export default ForgotPassword;
