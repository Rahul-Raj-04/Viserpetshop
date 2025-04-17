/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Baseurl } from "../../Config";
import { QRCodeSVG } from "qrcode.react";

function ShippingLabel({ id }) {
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
    <div className="border p-4 rounded-md shadow-md mt-4 flex items-center space-x-6 justify-between">
      {/* QR Code */}

      {/* Order Details */}
      <div>
        <h2 className="text-lg font-bold mb-2">Shipping Label</h2>
        <p>
          <strong>Order ID:</strong> {order.orderID}
        </p>
        <p>
          <strong>Receiver:</strong> {order.customer?.name}
        </p>
        <p>
          <strong>Address:</strong> {order.shippingInfo.address},{" "}
          {order.shippingInfo.city}, {order.shippingInfo.state}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer?.phone}
        </p>
        <p>
          <strong>Tracking Number:</strong>{" "}
          {order.trackingNumber || "Not Assigned"}
        </p>
      </div>
      <div>
        <QRCodeSVG
          value={JSON.stringify({
            orderID: order.orderID,
            trackingNumber: order.trackingNumber || "Not Assigned",
            receiver: order.customer?.name,
            phone: order.customer?.phone,
          })}
          size={250}
        />
      </div>
    </div>
  );
}

export default ShippingLabel;
