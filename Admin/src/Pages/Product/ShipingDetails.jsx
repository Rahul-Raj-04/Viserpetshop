/* eslint-disable react/prop-types */
import { useState } from "react";

function ShippingDetails({ onShippingChange }) {
  const [shipping, setShipping] = useState({
    width: "",
    height: "",
    weight: "",
    cost: 0,
  });

  // Shipping cost calculation function
  const calculateShippingCost = (width, height, weight) => {
    const baseRate = 10; // Base price per kg
    const volumeFactor = 1.0; // Additional cost per cubic inch

    if (!width || !height || !weight) return 0; // Avoid NaN errors

    return weight * baseRate + width * height * volumeFactor;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedShipping = { ...shipping, [name]: value };
    const safeParse = (val) =>
      Number.isNaN(parseFloat(val)) ? 0 : parseFloat(val);

    // Calculate new shipping cost
    const newCost = calculateShippingCost(
      safeParse(updatedShipping.width),
      safeParse(updatedShipping.height),
      safeParse(updatedShipping.weight)
    );

    updatedShipping.cost = newCost;

    setShipping(updatedShipping);

    // Send updated data to parent component (if needed)
    if (onShippingChange) {
      onShippingChange(updatedShipping);
    }
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <h4 className="text-[22px]">Handling</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Width (Inch)</p>
          <input
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            type="number"
            step="0.01"
            name="width"
            placeholder="Width"
            value={shipping.width}
            onChange={handleChange}
          />
          <span className="text-tiny">Set the product width.</span>
        </div>

        <div className="mb-5">
          <p className="mb-0 text-base text-black">Height (Inch)</p>
          <input
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            type="number"
            name="height"
            placeholder="Height"
            value={shipping.height}
            onChange={handleChange}
            step="0.01"
          />
          <span className="text-tiny">Set the product height.</span>
        </div>

        <div className="mb-5">
          <p className="mb-0 text-base text-black">Weight (KG)</p>
          <input
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            type="number"
            name="weight"
            step="0.01"
            placeholder="Weight"
            value={shipping.weight}
            onChange={handleChange}
          />
          <span className="text-tiny">Set the product weight.</span>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-0 text-base text-black">Handling Charge</p>
        <input
          className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
          type="text"
          name="cost"
          value={`₹${shipping.cost.toFixed(2)}`}
          readOnly
        />
        <span className="text-tiny">
          Handling Charge is calculated automatically.
        </span>
      </div>
    </div>
  );
}

export default ShippingDetails;
