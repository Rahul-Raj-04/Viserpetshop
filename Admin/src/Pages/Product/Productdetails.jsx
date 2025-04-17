/* eslint-disable react/prop-types */
import { useState } from "react";

function Productdetails({ product, handleChange }) {
    const [discountType, setDiscountType] = useState(product.discountType || "noDiscount");

    const handleDiscountChange = (type) => {
      setDiscountType(type);
      handleChange({ target: { name: "discountType", value: type } }); // ✅ Parent state update karega
    };
  return (
    <>
      <div className="bg-white px-8 py-8 rounded-md mb-6">
        <h4 className="text-[22px]">Details</h4>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
          <div className="mb-5">
            <p className="mb-0 text-base text-black">
              Base Price <span className="text-red">*</span>
            </p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Product price"
              value={product.price}
              onChange={handleChange}
              name="price"
            />
            <span className="text-tiny leading-4">
              Set the base price of product.
            </span>
          </div>

          <div className="mb-5">
            <p className="mb-0 text-base text-black">
              SKU <span className="text-red">*</span>
            </p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="SKU"
              value={product.sku}
              onChange={handleChange}
              name="sku"
            />
            <span className="text-tiny leading-4">Enter the product SKU.</span>
          </div>

          <div className="mb-5">
            <p className="mb-0 text-base text-black">
              Qantity <span className="text-red">*</span>
            </p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Qantity"
              value={product.qantity}
              onChange={handleChange}
              name="qantity"
            />
            <span className="text-tiny leading-4">
              Enter the product quantity.
            </span>
          </div>

          <div className="mb-5">
            <p className="mb-0 text-base text-black">Stock</p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              name="stock"
            />
            <span className="text-tiny leading-4">
              Set the product VAT about.
            </span>
          </div>
        </div>

        <div className="">
          <p className="mb-0 text-base text-black">
            Discount Type <span className="text-red">*</span>
          </p>
          <div className="flex items-center sm:space-x-3 flex-wrap mb-5">
            <div className="tp-checkbox-secondary mb-4">
              <label
                htmlFor="noDiscount"
                className={`border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer ${
                  discountType === "noDiscount" ? "bg-gray-200" : ""
                }`}
              >
                <small className="flex items-center">
                  <input
                    id="noDiscount"
                    type="radio"
                    name="priceDiscount"
                    checked={discountType === "noDiscount"}
                    onChange={() => handleDiscountChange("noDiscount")}
                  />
                  <span className="text-base font-medium">No Discount</span>
                </small>
              </label>
            </div>
            <div className="tp-checkbox-secondary mb-4">
              <label
                htmlFor="percentDiscount"
                className={`border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer ${
                  discountType === "fixedDiscount" ? "bg-gray-200" : ""
                }`}
              >
                <small className="flex items-center">
                  <input
                    id="percentDiscount"
                    type="radio"
                    name="priceDiscount"
                    checked={discountType === "fixedDiscount"}
                    onChange={() => handleDiscountChange("fixedDiscount")}
                  />
                  <span className="text-base font-medium">Fixed Discount</span>
                </small>
              </label>
            </div>
            <div className="tp-checkbox-secondary mb-4">
              <label
                htmlFor="fixedDiscount"
                className={`border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer ${
                  discountType === "percentDiscount" ? "bg-gray-200" : ""
                }`}
              >
                <small className="flex items-center">
                  <input
                    id="fixedDiscount"
                    type="radio"
                    name="priceDiscount"
                    checked={discountType === "percentDiscount"}
                    onChange={() => handleDiscountChange("percentDiscount")}
                  />
                  <span className="text-base font-medium">
                    Percent Discount
                  </span>
                </small>
              </label>
            </div>
          </div>
          {discountType === "fixedDiscount" && (
            <div className="mb-5">
              <p className="mb-0 text-base text-black">
                Price <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                type="text"
                 placeholder="Discounted Price"
                value={product.discountPrice}
                onChange={handleChange}
                 name="discountPrice"
              />
            </div>
          )}
          {discountType === "percentDiscount" && (
            <div className="mb-5">
              <p className="mb-2 text-base text-black">
                Percent <span className="text-red">*</span>
              </p>
              <input
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                type="text"
                placeholder="Discount Percentage"
              value={product.discountPercent}
              onChange={handleChange}
              name="discountPercent"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Productdetails;
