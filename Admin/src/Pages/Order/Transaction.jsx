import { useEffect, useState } from "react";
import Pagination from "../../Components/Utils/Pagination";
import SerachButton from "../../Components/Utils/SerachButton";
import Toppages from "../../Components/Utils/Toppages";
import useOrderStore from "../../Store/useOrderStore";

function Transaction() {
  const {
    transactions,
    fetchTransactions,
    loading,
    error,
    selectedTransaction,
    fetchTransactionById,
  } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed
  useEffect(() => {
    fetchTransactions(); // ✅ All transactions fetch karo
  }, [fetchTransactions]);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const totalItems = filteredTransactions.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Toppages title="Transaction" hidden />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 2xl:col-span-9">
            <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
              <div className="tp-search-box flex items-center justify-between px-8 py-4">
                <SerachButton
                  placeholder="Search by orderID"
                  className="flex-1 min-w-[200px]"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // reset to first page after search
                  }}
                />
              </div>
              <div className="relative overflow-x-auto mx-8 mb-3">
                {loading ? (
                  <p>Loading transactions...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <table className="w-[1099px] 3xl:text-red text-base text-left text-gray-500">
                    <thead className="bg-white">
                      <tr className="border-b border-gray6 text-tiny">
                        <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-[12%]">
                          Transaction ID
                        </th>
                        <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold">
                          Method
                        </th>
                        <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[250px] text-end">
                          Amount
                        </th>
                        <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[250px] text-end">
                          Date
                        </th>
                        <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                          Status
                        </th>
                        <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction._id}
                          className="bg-white border-b border-gray6 last:border-0"
                        >
                          <td className="px-3 py-3 font-normal text-[#55585B]">
                            #{transaction.transactionId}
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            <div className="flex items-center space-x-5">
                              <span className="font-medium text-heading">
                                {transaction.paymentMethod}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            ₹{transaction.totalAmount}
                          </td>
                          <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-3 text-end">
                            <span
                              className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end ${
                                transaction.paymentStatus === "Paid"
                                  ? "text-success bg-success/10"
                                  : "text-red-500 bg-red-100"
                              }`}
                            >
                              {transaction.paymentStatus}
                            </span>
                          </td>
                          <td className="pl-9 py-3 text-end">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                className="h-10 px-4 leading-10 text-tiny bg-white text-black border border-slate-300 rounded-md hover:bg-green-600 hover:text-white hover:border-green-600"
                                onClick={() =>
                                  fetchTransactionById(transaction._id)
                                }
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 2xl:col-span-3">
            <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
              <div className="px-8 py-8">
                <h5 className="text-xl mb-12">Transaction Details</h5>
                {selectedTransaction ? (
                  <div>
                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Transaction ID:</h5>
                      <p className="mb-0 text-tiny">
                        {selectedTransaction.transactionId}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Date:</h5>
                      <p className="mb-0 text-tiny">
                        {" "}
                        {new Date(
                          selectedTransaction.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Billing Address:</h5>
                      <p className="mb-0 text-tiny">
                        1947 Pursglove Court, Magnetic Springs
                      </p>
                    </div>
                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Item List:</h5>
                      {selectedTransaction.products.map((item, index) => (
                        <p key={index} className="mb-0  ">
                          <p href="#" className="text-hover-primary">
                            {index + 1} {item.name}
                          </p>
                        </p>
                      ))}
                    </div>
                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Total Ammount:</h5>
                      <p className="mb-0 text-tiny">
                        <span>Grand Total - </span> ₹
                        {selectedTransaction.totalAmount}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h5 className="mb-0 text-base">Payment Method:</h5>
                      <p className="mb-0 text-tiny">
                        {selectedTransaction.paymentMethod}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Click on a transaction to view details
                  </p>
                )}
                <button className="text-black border border-gray6 px-5 py-2 hover:text-white hover:bg-info hover:border-info">
                  <span className="mr-1">
                    <svg
                      className="-translate-y-px"
                      width="18"
                      height="18"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="m10.9052 29.895h10.18c1.099 0 1.99-.8909 1.99-1.99v-5.92c0-1.099-.891-1.99-1.99-1.99h-10.18c-1.099 0-1.99.891-1.99 1.99v5.92c0 1.099.8909 1.99 1.99 1.99z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="m7.915 26.0044v-6.0093c0-.5522.4478-1 1-1h14.1602c.5522 0 1 .4478 1 1v6.0098h1.5498c2.7461 0 4.98-1.9873 4.98-4.4302v-6.9795c0-2.4375-2.2339-4.4204-4.98-4.4204h-19.2598c-2.7407 0-4.9702 1.9829-4.9702 4.4204v6.9795c0 2.4429 2.2295 4.4302 4.9937 4.4297z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="m11.8751 2.105c-1.1 0-2 .9-2 2v3.84c0 .8174.6627 1.48 1.48 1.48h9.27c.8174 0 1.48-.6626 1.48-1.48v-3.85c0-1.1-.89-1.99-2-1.99z"
                      ></path>
                    </svg>
                  </span>{" "}
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
