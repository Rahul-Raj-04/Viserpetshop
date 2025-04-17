import Toppage from "../../Components/Toppage";
import useCartStore from "../Store/useCartStore";
import { useEffect, useState } from "react";

import ShopCard from "../Shop/ShopCard";
import Sidebar from "../Shop/SideBar";
import { useParams } from "react-router-dom";

function CatShop() {
    const { category } = useParams(); 
  const { products, fetchProducts } = useCartStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const productsPerPage = 12;
  useEffect(() => {
    fetchProducts(); // ✅ Fetch all products on page load
  }, [fetchProducts]);
  const normalizedCategory = category.replace(/-/g, " ");
  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  const filteredProducts = products.filter(
    (product) => product.category.name.toLowerCase() === normalizedCategory.toLowerCase()
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Toppage pagename={"Product Category"} />
      <div className="product-category-two py-120 ">
        <div className="container">
          <div className="row">
            <Sidebar
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
            <div className="col-lg-9">
              <div className="product-sidebar-filter d-lg-none d-block">
                <button className="product-sidebar-filter__button">
                  <i className="las la-filter"></i>
                  <span className="text"> Filter </span>
                </button>
              </div>
              <div className="row justify-content-center gy-4">
                {currentProducts.map((product) => (
                  <ShopCard key={product.id} product={product} />
                ))}

                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        <i className="fas fa-angle-left"></i>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        <i className="fas fa-angle-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CatShop;
