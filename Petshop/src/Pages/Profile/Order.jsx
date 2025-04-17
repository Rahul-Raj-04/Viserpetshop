/* eslint-disable react/prop-types */
import { useState } from "react";
import { View, ChevronLeft, ChevronRight } from "lucide-react";

const OrdersTable = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Calculate indexes for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div>
      <table className="table table--responsive--lg cart-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map(({ _id, orderID, orderDate, status, totalPrice }) => (
              <tr key={_id}>
                <td>{orderID}</td>
                <td>{orderDate}</td>
                <td
                  style={{
                    color:
                      status === "Pending"
                        ? "orange"
                        : status === "Delivered"
                        ? "green"
                        : status === "Cancelled"
                        ? "red"
                        : "black",
                  }}
                >
                  {status}
                </td>
                <td>₹{totalPrice}</td>
                <td>
                  <button className="btn btn--base pill">
                    <View />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Orders Yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {orders.length > ordersPerPage && (
        <div className="pagination flex justify-center items-center gap-4 mt-4 ">
          <button
            className="btn btn--base pill"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <span className=" mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn--base pill"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
