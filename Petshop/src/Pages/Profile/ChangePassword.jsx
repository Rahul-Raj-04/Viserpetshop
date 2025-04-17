import { useState } from "react";
import { toast } from "react-hot-toast";

import InputField from "../../Components/InputField";
import useAuthStore from "../Store/useAuthStore";

const ChangePasswordForm = () => {
  const { changePassword } = useAuthStore();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const success = await changePassword(
      formData.oldPassword,
      formData.newPassword
    );
    if (success) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Clear form
    }
  };

  return (
    <div className="account-form">
      <h3 className="account-form__title mb-2">Change Your Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <InputField
              label="Old Password"
              type="password"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6">
            <InputField
              label="New Password"
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6">
            <InputField
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-12">
            <button type="submit" className="btn btn--base w-100">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
