/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useFetchData from "../../Components/Utils/AllProductmap";
import { Baseurl } from "../../Config";
import Pagination from "../../Components/Utils/Pagination";
import Toppages from "../../Components/Utils/Toppages";
import SerachButton from "../../Components/Utils/SerachButton";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import useGenarlStore from "../../Store/Genaralsetting";
function Customerlist() {
  const { customers, loading, fetchCustomers, deleteCustomer } =
    useGenarlStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Filter users based on search and status
  const filteredUsers = customers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || user.status === statusFilter)
  );

  const itemsPerPage = 5;
  const totalUsers = filteredUsers.length;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Customer_List.xlsx");
  };
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleStatusChange = (event) => setStatusFilter(event.target.value);

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteCustomer(userId);
        if (success) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };
  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title="Customer" hidden />

      <div className="bg-white rounded-md shadow-xs py-4">
        {/* Search & Filter Section */}
        <div className="tp-search-box flex items-center justify-between px-8 py-8">
          <SerachButton
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex space-x-6">
            <div className="search-select mr-3 hidden sm:flex items-center space-x-3">
              <span className="text-tiny">Status:</span>
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
            </div>

            <button
              className="tp-btn bg-info/10 text-info hover:text-white hover:bg-theme py-2"
              onClick={exportToExcel}
            >
              <span className="mr-2">⬆️</span> Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto mx-8">
          <table className="w-full text-base text-left text-gray-500">
            <thead className="bg-white">
              <tr className="border-b border-gray6 text-tiny">
                <th className="py-3 w-[3%]">
                  <input type="checkbox" id="selectAllProduct" />
                </th>
                <th className="pr-8 py-3">ID</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Join Date</th>
                <th className="px-9 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b border-gray6 text-start"
                >
                  <td className="pr-3">
                    <input type="checkbox" id={`user-${user._id}`} />
                  </td>
                  <td className="px-3 py-3">#{user._id}</td>
                  <td className="pr-8 py-5">
                    <div className="flex items-start   text-end space-x-5">
                      
                      <span>{user.fullName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-md bg-${
                        user.status === "Active" ? "success/10" : "danger/10"
                      } text-${
                        user.status === "Active" ? "success" : "danger"
                      } font-medium`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {new Date(user.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-9 py-3">
                    <div className="flex items-center space-x-2">
                    
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="w-10 h-10 border border-gray text-slate-600 rounded-md hover:bg-danger hover:text-white"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={totalUsers}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Customerlist;
