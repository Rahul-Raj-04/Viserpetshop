import { create } from "zustand";
import { toast } from "react-hot-toast";
import { Baseurl } from "../../Config";
import useAuthStore from "./useAuthStore";

const usePaymentStore = create(() => ({
  handleCheckout: async (cartData, formData, navigate) => {
    if (!cartData) {
      alert("Cart is empty!");
      return;
    }
    const authUser = useAuthStore.getState().authUser;
    // ✅ Mapping payment methods correctly
    const PAYMENT_MAPPING = {
      COD: { method: "COD", gateway: "COD" },
      Razorpay: { method: "UPI", gateway: "Razorpay" },
      PhonePe: { method: "UPI", gateway: "PhonePe" },
    };

    const selectedPayment = PAYMENT_MAPPING[formData.paymentMethod];

    if (!selectedPayment) {
      toast.error("Invalid payment method selected!");
      return;
    }

    const checkoutPayload = {
      customer: authUser._id,
      totalAmount: Number(cartData.total),
      products: cartData.items.map(({ product, quantity, price }) => ({
        product: product._id,
        quantity,
        price,
      })),
      shippingInfo: {
        address: formData.address,
        city: formData.city,
        state: formData.state || "UP",
        postalCode: formData.postalCode,
        phoneNumber: formData.phoneNumber,
      },
      paymentInfo: {
        method: selectedPayment.method, // ✅ "UPI", "COD", etc.
        gateway: selectedPayment.gateway, // ✅ "Razorpay", "PhonePe"
        status: "Pending",
      },
    };

    try {
      const response = await fetch(`${Baseurl}order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(`Error: ${result.message}`);
        return;
      }

      if (formData.paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cartData");
        setTimeout(() => navigate("/profile"), 2000);
        return;
      }

      if (formData.paymentMethod === "Razorpay") {
        usePaymentStore
          .getState()
          .initiateRazorpay(result.paymentGatewayData, formData, navigate);
      } else if (formData.paymentMethod === "PhonePe") {
        window.location.href =
          result.paymentGatewayData.gatewayResponse.redirectUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  },

  initiateRazorpay: (paymentData, formData, navigate) => {
    const options = {
      key: "rzp_test_HTwkRgRF0LKywx", // Replace with your Razorpay API key
      amount: paymentData.gatewayResponse.amount,
      currency: "INR",
      name: "E bazar",
      description: "Order Payment",
      image: "/logo.png",
      order_id: paymentData.gatewayOrderId,
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(
            `${Baseurl}transaction/verify/razorpay`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyResult = await verifyResponse.json();
          console.log(verifyResult);

          if (verifyResponse.ok) {
            toast.success("Payment successful!");
            localStorage.removeItem("cartData");
            setTimeout(() => navigate("/profile"), 2000);
          } else {
            alert("Payment verification failed.");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Something went wrong.");
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phoneNumber,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  },
}));

export default usePaymentStore;
