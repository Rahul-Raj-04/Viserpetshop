import { useEffect, useState } from "react";
import useGenarlStore from "../../Store/Genaralsetting";
import Pagination from "../../Components/Utils/Pagination";
import { Pencil, Trash2 } from "lucide-react";

function Banner() {
  const { banners, fetchBanners, deleteBanner, setEditBanner } =
    useGenarlStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBanners = banners.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="col-span-12 lg:col-span-8">
        <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[975px] 2xl:w-full">
              <table className="w-full text-base text-left text-gray-500">
                <thead>
                  <tr className="border-b border-gray6 text-tiny">
                    <th className="px-3 py-3 w-[150px]">Image</th>
                    <th className="px-3 py-3 w-[170px]">Title</th>

                    <th className="px-3 py-3 w-[100px] text-end">Active</th>
                    <th className="px-3 py-3 w-[100px] text-end">Order</th>
                    <th className="px-3 py-3 w-[150px] text-end">Place</th>
                    <th className="px-3 py-3 w-[150px] text-end">Type</th>
                    <th className="px-9 py-3 w-[12%] text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBanners.map((banner) => (
                    <tr
                      key={banner.id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td>
                        <img
                          className="w-10 h-10 rounded-full"
                          src={banner.imageUrl}
                          alt=""
                        />
                      </td>
                      <td>{banner.title}</td>

                      <td className="text-end">
                        {banner.isActive ? "Yes" : "No"}
                      </td>
                      <td className="text-end">{banner.displayOrder}</td>
                      <td className="text-end">{banner.place}</td>
                      <td className="text-end">{banner.type}</td>
                      <td className="px-9 py-3 text-end flex justify-end gap-2">
                        <button
                          onClick={() => deleteBanner(banner._id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => setEditBanner(banner)}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            totalItems={banners.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
