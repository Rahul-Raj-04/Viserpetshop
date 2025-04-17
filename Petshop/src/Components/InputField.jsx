/* eslint-disable react/prop-types */
import { useState } from "react";

function InputField({ label, type, id, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Restriction
  const handleInput = (e) => {
    let inputValue = e.target.value;

    if (type === "number") {
      inputValue = inputValue.replace(/\D/g, "").slice(0, 10); // Only numbers, max 10 digits
    } else if (type === "text") {
      inputValue = inputValue.replace(/[^A-Za-z\s]/g, ""); // Only letters and spaces
    } else if (type === "email") {
      inputValue = inputValue.replace(/[^a-zA-Z0-9@._-]/g, ""); // Only valid email characters
    }

    onChange({ target: { id, value: inputValue } }); // Send updated value to parent
  };

  return (
    <div className="form-group position-relative">
      <label htmlFor={id} className="form--label">
        {label}
      </label>
      <input
        type={type === "password" && !showPassword ? "password" : "text"} // Toggle password visibility
        className="form--control"
        id={id}
        placeholder={placeholder}
        value={value} // Use parent state
        onChange={handleInput} // Call parent state update function
      />
      {type === "password" && (
        <div
          className={`password-show-hide fas ${
            showPassword ? "fa-eye-slash" : "fa-eye"
          } toggle-password`}
          id={`#${id}`}
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "70%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        ></div>
      )}
    </div>
  );
}

export default InputField;
