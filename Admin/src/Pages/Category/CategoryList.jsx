import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useProductStore from "../../Store/useProductStore";
import Papa from "papaparse";
import Pagination from "../../Components/Utils/Pagination";

function CategoryList() {
  const {
    categories,
    fetchCategories,
    deleteCategory,
    deleteMultipleCategory,
    addBulkCategories,
    setEditCategory,
  } = useProductStore();
  const [selectedIds, setSelectedIds] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = categories.map((cat) => cat._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteMultiple = () => {
    if (selectedIds.length > 0) {
      deleteMultipleCategory(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleDeleteSingle = (id) => {
    deleteCategory(id);
  };

  const handleCsvChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;

        // Example transformation if needed
        const categories = parsedData.map((item) => ({
          name: item.name,
          slug: item.slug,
          description: item.description || "",
          parent: item.parent || null,
          image: item.image || null,
        }));

        addBulkCategories(categories);
        setCsvFile(null);
      },
    });
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategory = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
            disabled={selectedIds.length === 0}
            onClick={handleDeleteMultiple}
          >
            Delete
          </button>

          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".csv"
              className="border rounded w-60 py-1"
              onChange={handleCsvChange}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              disabled={!csvFile}
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500">
              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th className="py-3 text-tiny text-text2 uppercase font-semibold w-[3%]">
                    <div className="tp-checkbox -translate-y-[3px]">
                      <input
                        id="selectAllProduct"
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedIds.length === categories.length &&
                          categories.length > 0
                        }
                      />
                      <label htmlFor="selectAllProduct"></label>
                    </div>
                  </th>
                  <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]">
                    Name
                  </th>
                  <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Description
                  </th>
                  <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Slug
                  </th>
                  <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Parent
                  </th>
                  <th className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(categories) &&
                  currentCategory.map((cat) => (
                    <tr
                      key={cat._id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td className="pr-3 whitespace-nowrap">
                        <div className="tp-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(cat._id)}
                            onChange={() => handleCheckboxChange(cat._id)}
                          />
                          <label htmlFor={cat._id}></label>
                        </div>
                      </td>

                      <td className="pr-8 py-5 whitespace-nowrap">
                        <div className="flex items-center space-x-5">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={cat.image || "https://via.placeholder.com/40"} // fallback image
                            alt={cat.name}
                          />
                          <span className="font-medium text-heading text-hover-primary transition">
                            {cat.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {cat.description || "-"}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {cat.slug}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {cat.parent || "-"}
                      </td>
                      <td className="px-9 py-3 text-end">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            title="Delete"
                            onClick={() => handleDeleteSingle(cat._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => setEditCategory(cat)}
                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CategoryList;
