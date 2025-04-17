import { useState } from "react";
import { Baseurl } from "../../Config";
import useFetchData from "../../Components/Utils/AllProductmap";
import Toppages from "../../Components/Utils/Toppages";
import SerachButton from "../../Components/Utils/SerachButton";
import Pagination from "../../Components/Utils/Pagination";
import Swal from "sweetalert2";
import AddCouponModel from "./AddCouponModel";

function Coupon() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: coupons, refetch } = useFetchData(`${Baseurl}coupon/coupons`);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Default: No filter

  const itemsPerPage = 10;

  // Filter coupons based on search term and status
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? coupon.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalUsers = filteredCoupons.length;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentCoupon = filteredCoupons.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = async (couponId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${Baseurl}coupon/delete?id=${couponId}`, { method: "DELETE" });

          if (!response.ok) {
            throw new Error("Failed to delete coupon");
          }

          Swal.fire("Deleted!", "The coupon has been deleted.", "success");
          refetch();
        } catch (error) {
          console.error("Error deleting coupon:", error);
          Swal.fire("Error!", "Failed to delete the coupon.", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between mb-10">
          <Toppages title="Coupon" hidden={true} />
        </div>

        <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[1500px] xl:w-full">
              <div className="tp-search-box flex items-center justify-between px-8 py-8">
                <SerachButton
                  placeholder="Search by Coupon Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex justify-end space-x-6">
                  <div className="search-select mr-3 flex items-center space-x-3">
                    <span className="text-tiny inline-block leading-none -translate-y-[2px]">
                      Status:
                    </span>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="product-add-btn flex">
                    <button type="button" className="tp-btn offcanvas-open-btn" onClick={() => setIsOpen(true)}>
                      Add Coupon
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative overflow-x-auto mx-8">
                <table className="w-full text-base text-left text-gray-500">
                  <thead className="bg-white">
                    <tr className="border-b border-gray6 text-tiny">
                      <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">Name</th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Code
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Min Amount
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Discount Type
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Status
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Start
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        End
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                        Used
                      </th>
                      <th className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCoupon.map((coupon, index) => (
                      <tr key={index} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                        <td className="pr-8 py-5 whitespace-nowrap">
                          <div className="flex items-center space-x-5">
                            <span className="font-medium text-heading">{coupon.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-black font-normal text-end">{coupon.code}</td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">{coupon.minimumAmount}₹</td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          {coupon.discountType === "Percent Price"
                            ? `${coupon.percent}% (₹${(coupon.minimumAmount * coupon.percent) / 100} Off)`
                            : `₹${coupon.price} Off`}
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          <span
                            className={`text-[11px] px-3 py-1 rounded-md font-medium ${
                              coupon.status === "active"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {coupon.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-end">{new Date(coupon.start).toLocaleDateString()}</td>
                        <td className="px-3 py-3 text-end">{new Date(coupon.end).toLocaleDateString()}</td>
                        <td className="px-3 py-3 text-end">{coupon.used}</td>
                        <td className="px-9 py-3 text-end">
                          <button className="w-10 h-10 bg-success text-white rounded-md">📝</button>
                          <button
                            className="w-10 h-10 bg-white border border-gray text-slate-600 rounded-md hover:bg-danger"
                            onClick={() => handleDelete(coupon._id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination totalItems={totalUsers} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </div>

      <AddCouponModel isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
    </>
  );
}

export default Coupon;
