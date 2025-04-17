import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import Papa from "papaparse";
import { Pencil, Trash2, Upload } from "lucide-react";

import SerachButton from "../../Components/Utils/SerachButton";
import Toppages from "../../Components/Utils/Toppages";
import Pagination from "../../Components/Utils/Pagination";

import useProductStore from "../../Store/useProductStore";

function Productlist() {
  const navigate = useNavigate();
  const {
    products,
    fetchProducts,
    deleteProduct,
    deleteMultipleProducts,
    uploadProductsCSV,
  } = useProductStore();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Pagination logic
  const totalItems = filteredProducts.length;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery]);


  // Handlers
  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteProduct(id);
    }
  };

  const handleUpload = async () => {
    if (csvData.length === 0) {
      return Swal.fire("Error", "No data to upload", "error");
    }

    setUploading(true);
    const result = await uploadProductsCSV(csvData);

    if (result.success) {
      setCsvData([]);
    }

    setUploading(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  const toggleSelectAll = (e) => {
    setSelectedProducts(
      e.target.checked ? products.map((product) => product._id) : []
    );
  };

  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteMultiple = async () => {
    if (selectedProducts.length > 0) {
      await deleteMultipleProducts(selectedProducts);
      setSelectedProducts([]);
    }
  };

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title="Products" hidden={false} />

      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        {/* Header buttons and upload */}
        <div className="tp-search-box flex flex-wrap items-center justify-between px-4 sm:px-8 py-4 gap-4">
          <div className="flex flex-wrap items-center justify-end gap-4">
            <SerachButton
              placeholder="Search by product name"
              className="flex-1 min-w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleDeleteMultiple}
              disabled={selectedProducts.length === 0}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
            >
              Delete
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="border rounded w-56 py-1"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading || csvData.length === 0}
              className="tp-btn bg-warning/10 text-warning hover:text-white hover:bg-warning py-2 px-4"
            >
              <Upload size={18} className="mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <Link
              to="/add-product"
              className="tp-btn py-2 px-4 bg-theme text-white hover:bg-info"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* Product Table */}
        <div className="relative overflow-x-auto mx-8">
          <table className="w-full text-base text-left text-gray-500">
            <thead className="bg-white">
              <tr className="border-b border-gray6 text-tiny">
                <th className="py-3 w-[3%]">
                  <div className="tp-checkbox -translate-y-[3px]">
                    <input
                      id="selectAllProduct"
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={
                        selectedProducts.length === products.length &&
                        products.length > 0
                      }
                    />
                    <label htmlFor="selectAllProduct" />
                  </div>
                </th>
                <th className="pr-8 py-3 font-semibold uppercase">Product</th>
                <th className="px-3 py-3 font-semibold uppercase text-end w-[170px]">
                  SKU
                </th>
                <th className="px-3 py-3 font-semibold uppercase text-end w-[170px]">
                  QTY
                </th>
                <th className="px-3 py-3 font-semibold uppercase text-end w-[170px]">
                  Price
                </th>
                <th className="px-3 py-3 font-semibold uppercase text-end w-[170px]">
                  Category
                </th>
                <th className="px-3 py-3 font-semibold uppercase text-end w-[170px]">
                  Discount
                </th>
                <th className="px-9 py-3 font-semibold uppercase text-end w-[12%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray6 last:border-0"
                >
                  <td className="pr-3 whitespace-nowrap">
                    <div className="tp-checkbox">
                      <input
                        id={`product-${index}`}
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => toggleSelect(product._id)}
                      />
                      <label htmlFor={`product-${index}`} />
                    </div>
                  </td>
                  <td className="pr-8 py-5 whitespace-nowrap">
                    <a href="#" className="flex items-center space-x-5">
                      <img
                        className="w-[60px] h-[60px] rounded-md"
                        src={product.image[0]}
                        alt={product.name}
                      />
                      <span className="font-medium text-heading text-hover-primary transition">
                        {product.name}
                      </span>
                    </a>
                  </td>
                  <td className="px-3 py-3 text-end">{product.sku}</td>
                  <td className="px-3 py-3 text-end">{product.stock}</td>
                  <td className="px-3 py-3 text-end">{product.price}</td>
                  <td className="px-3 py-3 text-end">
                    {product.category?.name}
                  </td>
                  <td className="px-3 py-3 text-end">{product.discountType}</td>
                  <td className="px-9 py-3 text-end">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="w-10 h-10 bg-success text-white rounded-md hover:bg-green-600"
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="w-10 h-10 bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Productlist;
