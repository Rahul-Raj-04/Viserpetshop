/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Baseurl } from "../../Config";
import Swal from "sweetalert2";

const AddCouponModel = ({ isOpen, setIsOpen, refetch }) => {
  const [couponData, setCouponData] = useState({
    name: "",
    code: "",
    start: "",
    end: "",
    discountType: "Fixed Price",
    price: "",
    percent: "",
    minimumAmount: "",
    publish: "Now",
    publishDate: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update discount type in state properly
    if (name === "discountType") {
      setCouponData((prev) => ({
        ...prev,
        discountType: value,
        price: "",
        percent: "",
      }));
    } else {
      setCouponData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Remove publishDate if publishing now
      const dataToSend = { ...couponData };
      if (couponData.publish === "Now") {
        delete dataToSend.publishDate;
      }

      const response = await axios.post(Baseurl + "coupon/add", dataToSend);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Coupon added successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          setCouponData({  // Reset the form data
            name: "",
            code: "",
            start: "",
            end: "",
            discountType: "",
            price: "",
            percent: "",
            minimumAmount: "",
            publish: "",
            publishDate: "",
            
          });
          setIsOpen(false);
          refetch();
      });
      }
    } catch (error) {
      console.error("Error adding coupon:", error);

      // Extract error message from API response
      let errorMessage = "Failed to add coupon. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div
      className={`offcanvas-area fixed top-0 right-0 h-full bg-white w-[280px] sm:w-[400px] z-[999] overflow-y-scroll shadow-md transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%+80px)]"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center space-x-3 py-3 px-8 shadow-md sticky top-0 left-0 right-0 w-full z-[99] bg-white">
            <button className="text-black" onClick={() => setIsOpen(false)}>
              ✖
            </button>
            <p className="text-[15px] font-medium text-[#82808a]">
              Enter Coupon Details
            </p>
          </div>

          <div className="px-8 pt-6">
            {/* Name */}
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Name <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] border px-6"
                type="text"
                name="name"
                value={couponData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            {/* Code */}
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Code <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] border px-6"
                type="text"
                name="code"
                value={couponData.code}
                onChange={handleChange}
                placeholder="Code"
              />
            </div>

            {/* Start Date */}
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Start Date <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] border px-6"
                type="date"
                name="start"
                value={couponData.start}
                onChange={handleChange}
              />
            </div>

            {/* End Date */}
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                End Date <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] border px-6"
                type="date"
                name="end"
                value={couponData.end}
                onChange={handleChange}
              />
            </div>

            {/* Discount Type */}
            <div className="mb-5">
              <p className="mb-4 text-base text-black">
                Discount Type <span className="text-red">*</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="tp-checkbox flex items-center">
                  <input
                    id="fixedPriceCoupon"
                    type="radio"
                    name="discountType"
                    value="Fixed Price"
                    checked={couponData.discountType === "Fixed Price"}
                    onChange={handleChange}
                  />
                  <label htmlFor="fixedPriceCoupon">Fixed Price</label>
                </div>
                <div className="tp-checkbox flex items-center">
                  <input
                    id="percentPriceCoupon"
                    type="radio"
                    name="discountType"
                    value="Percent Price"
                    checked={couponData.discountType === "Percent Price"}
                    onChange={handleChange}
                  />
                  <label htmlFor="percentPriceCoupon">Percent Price</label>
                </div>
              </div>
            </div>

            {/* Fixed Price Input */}
            {couponData.discountType === "Fixed Price" && (
              <div className="mb-5">
                <p className="mb-0 text-base text-black">
                  Price <span className="text-red">*</span>
                </p>
                <input
                  className="input w-full h-[44px] border px-6"
                  type="text"
                  name="price"
                  value={couponData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>
            )}

            {/* Percent Input */}
            {couponData.discountType === "Percent Price" && (
              <div className="mb-5">
                <p className="mb-0 text-base text-black">
                  Percent <span className="text-red">*</span>
                </p>
                <input
                  className="input w-full h-[44px] border px-6"
                  type="text"
                  name="percent"
                  value={couponData.percent}
                  onChange={handleChange}
                  placeholder="Percent"
                />
              </div>
            )}

            {/* Minimum Amount */}
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Minimum Amount <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] border px-6"
                type="text"
                name="minimumAmount"
                value={couponData.minimumAmount}
                onChange={handleChange}
                placeholder="Amount"
              />
            </div>

            {/* Publish Options */}
            <div className="mb-5">
              <p className="mb-4 text-base text-black">
                Publish <span className="text-red">*</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  <input
                    type="radio"
                    name="publish"
                    value="Now"
                    checked={couponData.publish === "Now"}
                    onChange={handleChange}
                  />{" "}
                  Now
                </label>
                <label>
                  <input
                    type="radio"
                    name="publish"
                    value="Later"
                    checked={couponData.publish === "Later"}
                    onChange={handleChange}
                  />{" "}
                  Later
                </label>
              </div>
            </div>

            {/* Publish Date (Only If "Later") */}
            {couponData.publish === "Later" && (
              <div className="mb-5">
                <p className="mb-0 text-base text-black">
                  Publish Date <span className="text-red">*</span>
                </p>
                <input
                  className="input w-full h-[44px] border px-6"
                  type="date"
                  name="publishDate"
                  value={couponData.publishDate}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="sm:flex items-center sm:space-x-3 py-6 px-8 sticky bottom-0 left-0 right-0 w-full z-[99] bg-white shadow-_md mt-8 flex-wrap sm:flex-nowrap">
          <button
            className="tp-btn w-full sm:w-1/2 items-center justify-around mb-2 sm:mb-0"
            onClick={handleSubmit}
          >
            Add Coupon
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="tp-btn w-full sm:w-1/2 items-center justify-around border border-gray6 bg-white text-black hover:text-white hover:border-danger hover:bg-danger"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCouponModel;
