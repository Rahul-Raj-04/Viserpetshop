import { useEffect } from "react";

import { useParams } from "react-router-dom";

import useOrderStore from "../../Store/useOrderStore";

function OrderDetail() {
  const { id } = useParams();
  const { order, status, fetchOrder, changeStatus, saveStatus } =
    useOrderStore();

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id, fetchOrder]);

  if (!order) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between mb-10">
          <div className="page-title">
            <h3 className="mb-0 text-[28px]">Order Details</h3>

            <ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
              <li className="breadcrumb-item text-muted">
                <a href="product-list.html" className="text-hover-primary">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item flex items-center">
                <span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                Order Details #{order.orderID}
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          <div className="flex items-center flex-wrap justify-between px-8 mb-6 bg-white rounded-t-md rounded-b-md shadow-xs py-6">
            <div className="relative">
              <h5 className="font-normal mb-0">Oder ID : {order.orderID}</h5>
              <p className="mb-0 text-tiny">
                Order Created : {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex sm:justify-end flex-wrap sm:space-x-6 mt-5 md:mt-0">
              <div className="search-select mr-3 flex items-center space-x-3 ">
                <span className="text-tiny inline-block leading-none -translate-y-[2px]">
                  Change Status :{" "}
                </span>
                <select
                  value={status}
                  onChange={(e) => changeStatus(e.target.value)}
                >
                  <option value="Delivered">Delivered</option>

                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
              <button onClick={() => saveStatus(id)} className="tp-btn">
                Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Customer Details</h5>

              <div className="relative overflow-x-auto ">
                <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                  <tbody>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Name
                      </td>
                      <td className="py-3 whitespace-nowrap ">
                        <a
                          href="#"
                          className="flex items-center justify-end space-x-5 text-end text-heading text-hover-primary"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://html.hixstudio.net/ebazer/assets/img/users/user-10.jpg"
                            alt=""
                          />
                          <span className="font-medium ">
                            {order.customer.name}
                          </span>
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Email
                      </td>
                      <td className="py-3 text-end">
                        <a href="mailto:support@mail.com">
                          {order.customer.email}
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Phone
                      </td>
                      <td className="py-3 text-end">
                        <a href="tel:9458785014">{order.customer.phone}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Order Summary</h5>

              <div className="relative overflow-x-auto ">
                <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                  <tbody>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Order Date
                      </td>
                      <td className="py-3 whitespace-nowrap text-end">
                        04/05/2023
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Payment Method
                      </td>
                      <td className="py-3 text-end">
                        {order.paymentInfo.method}
                        {/* <img
                          className="w-[40px] h-auto"
                          src="https://html.hixstudio.net/ebazer/assets/img/icons/visa.svg"
                          alt=""
                        /> */}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[50%]">
                        Shipping Method
                      </td>
                      <td className="py-3 text-end">Cash On Delivery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Deliver To</h5>

              <div className="relative overflow-x-auto ">
                <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                  <tbody>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[40%]">
                        House
                      </td>
                      <td className="py-3 text-end">
                        {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                        {order.shippingInfo.state}{" "}
                        {order.shippingInfo.postalCode}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[40%]">
                        City
                      </td>
                      <td className="py-3 whitespace-nowrap text-end">
                        {order.shippingInfo.city}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="py-3 font-normal text-[#55585B] w-[40%]">
                        State
                      </td>
                      <td className="py-3 text-end">
                        {order.shippingInfo.state}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-8">
              <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8">
                <div className="relative overflow-x-auto  mx-8">
                  <table className="w-[975px] md:w-full text-base text-left text-gray-500">
                    <thead className="bg-white">
                      <tr className="border-b border-gray6 text-tiny">
                        <th
                          scope="col"
                          className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                        >
                          Unit Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                        >
                          <td className="pr-8 py-5 whitespace-nowrap">
                            <a href="#" className="flex items-center space-x-5">
                              <img
                                className="w-[40px] h-[40px] rounded-md"
                                src={product.image}
                                alt={product.name}
                              />
                              <span className="font-medium text-heading text-hover-primary transition">
                                {product.name}
                              </span>
                            </a>
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            ₹{product.unitPrice}
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            {product.quantity}
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            ₹{product.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-span-12 2xl:col-span-4">
              <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-8 px-8">
                <h5>Order Price</h5>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-base text-left text-gray-500">
                    <tbody>
                      <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                        <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                          Subtotal
                        </td>
                        <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                          ₹{order.subtotal}
                        </td>
                      </tr>
                      <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                        <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                          Shipping cost:
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          ₹{order.shippingCost}
                        </td>
                      </tr>
                      <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                        <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                          Grand total:
                        </td>
                        <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                          ₹{order.grandTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
