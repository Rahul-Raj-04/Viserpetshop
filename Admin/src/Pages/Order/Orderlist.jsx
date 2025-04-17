import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, HandMetal, PrinterCheck, Tag } from "lucide-react";
import Toppages from "../../Components/Utils/Toppages";
import Pagination from "../../Components/Utils/Pagination";
import SerachButton from "../../Components/Utils/SerachButton";
import Invoice from "../../Pages/Invoice/Invoice";
import ShippingLabel from "../Invoice/ShippingLabel";
import useOrderStore from "../../Store/useOrderStore";

const orderStatuses = [
  "All",
  "Delivered",
  "Processing",
  "Shipped",
  "Cancelled",
  "Pending",
];

function Orderlist() {
  const {
    orders,
    filteredOrders,
    loading,
    error,
    fetchOrders,
    searchQuery,
    selectedStatus,
    setSearchQuery,
    setSelectedStatus,
  } = useOrderStore();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handlePrint = () => window.print();
  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title="Order List" hidden />

      <div className="bg-white rounded-md shadow-xs py-4">
        {/* Tabs for Status */}
        <div className="border-b flex space-x-4 px-8">
          {orderStatuses.map((status) => (
            <button
              key={status}
              className={`py-2 px-4 font-medium ${
                selectedStatus === status
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedStatus(status === "All" ? "" : status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="tp-search-box flex items-center justify-between px-8 py-4">
          <SerachButton
            placeholder="Search by orderID"
            className="flex-1 min-w-[200px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Order Table */}
        <div className="relative overflow-x-auto mx-8">
          <table className="w-[1500px] 2xl:w-full text-base text-left text-gray-500">
            <thead className="bg-white">
              <tr className="border-b border-gray6 text-tiny">
                {[
                  "Order ID",
                  "Customer",
                  "QTY",
                  "Total",
                  "Status",
                  "Date",
                  "Action",
                  "Invoice",
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold  "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    Loading orders...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr
                    className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    key={order._id}
                  >
                    <td className="px-3 py-3 font-normal text-[#55585B]">
                      {order.orderID}
                    </td>

                    <td className="px-3 py-3 font-normal text-[#55585B] ">
                      {order.customer?.name}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] ">
                      {order.totalItems}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] ">
                      ₹{order.totalPrice}
                    </td>
                    <td className="px-3 py-3 ">
                      <span
                        className={`px-3 py-1 rounded-md font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] ">
                      {order.orderDate}
                    </td>

                    <td className="px-3 py-3">
                      <button className="p-2 bg-blue-500 text-white rounded-md">
                        <Link to={`/order-details/${order._id}`}>
                          <Eye size={18} />
                        </Link>
                      </button>{" "}
                      <button className="p-2 bg-gray-400 text-white rounded-md">
                        <HandMetal size={18} />
                      </button>
                    </td>

                    <td className="px-3 py-3 flex gap-2">
                      <button
                        onClick={() => setSelectedOrderId(order._id)}
                        className="p-2 bg-gray-300 rounded-md"
                      >
                        <PrinterCheck size={18} />
                      </button>
                      <button
                        onClick={() => setSelectedShippingId(order._id)}
                        className="p-2 bg-green-500 text-white rounded-md"
                      >
                        <Tag size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {selectedOrderId && (
          <motion.div
            className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white shadow-lg rounded-xl p-4 relative w-[90%] max-w-3xl">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="absolute top-2 right-2 p-1"
              >
                ✖
              </button>
              <Invoice id={selectedOrderId} />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Print
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shipping Label Modal */}
      <AnimatePresence>
        {selectedShippingId && (
          <motion.div
            className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white shadow-lg rounded-xl p-4 relative w-[90%] max-w-3xl">
              <button
                onClick={() => setSelectedShippingId(null)}
                className="absolute top-2 right-2 p-1"
              >
                ✖
              </button>
              <ShippingLabel id={selectedShippingId} />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Print
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Orderlist;
