/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";

function Invoice({ id }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${Baseurl}order/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => console.error("Error fetching order details:", err));
    }
  }, [id]);

  if (!order) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold">Invoice #{order.orderID}</h2>
        <img
          src="https://html.hixstudio.net/ebazer/assets/img/logo/logo.svg"
          alt="Company Logo"
          className="h-12"
        />
      </div>
      <div className=" flex justify-between py-4">
        {" "}
        <div className="mb-6 space-y-1">
          <h3 className="text-lg font-semibold">Customer Details:</h3>
          <p className="leading-tight">Name: {order.customer.name}</p>
          <p className="leading-tight">Email: {order.customer.email}</p>
          <p className="leading-tight">Phone: {order.customer.phone}</p>
        </div>
        <div className="mb-6 space-y-1">
          <h3 className="text-lg font-semibold">Shipping Details</h3>
          <p className="leading-tight">
            {" "}
            {order.shippingInfo.address}, {order.shippingInfo.city}
          </p>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Product</th>
            <th className="border p-2 text-right">Price</th>
            <th className="border p-2 text-right">Qty</th>
            <th className="border p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2 text-right">₹{product.unitPrice}</td>
              <td className="border p-2 text-right">{product.quantity}</td>
              <td className="border p-2 text-right">₹{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <p>
          <strong>Subtotal:</strong> ₹{order.subtotal}
        </p>
        <p>
          <strong>Shipping:</strong> ₹{order.shippingCost}
        </p>
        <p className="text-xl font-bold">
          <strong>Grand Total:</strong> ₹{order.grandTotal}
        </p>
      </div>
    </div>
  );
}

export default Invoice;
