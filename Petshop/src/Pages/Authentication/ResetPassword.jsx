import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toppage from "../../Components/Toppage";
import InputField from "../../Components/InputField";
import useAuthStore from "../Store/useAuthStore";
import toast from "react-hot-toast";

function ResetPassword() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  console.log(id);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    const success = await resetPassword(id, token, newPassword);

    if (success) {
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error("Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Toppage pagename="Reset Password" />
      <section className="account py-120">
        <div className="account-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-none d-lg-block">
                <div className="account-thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/login-img.png"
                    alt="Reset Password"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="account-form">
                  <div className="account-form__content mb-4">
                    <h3 className="account-form__title mb-2">
                      Set a New Password
                    </h3>
                    <p className="account-form__desc">
                      Enter your new password below.
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword}>
                    <div className="row">
                      <div className="col-sm-12">
                        <InputField
                          label="New Password"
                          type="password"
                          id="newPassword"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-sm-12">
                        <InputField
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <button type="submit" className="btn btn--base w-100">
                            {loading ? "Resetting..." : "Reset Password"}
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="have-account text-center">
                          <p className="have-account__text">
                            Back to
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

export default ResetPassword;
