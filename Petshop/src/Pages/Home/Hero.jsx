import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

import useCartStore from "../Store/useCartStore";
import useGenarlStore from "../Store/GenralStore";

function Hero() {
  const { categories, fetchCategories } = useCartStore();
  const { banners, fetchBanners } = useGenarlStore();
  useEffect(() => {
    fetchCategories(); // ✅ Fetch categories on load
  }, [fetchCategories]);
 
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  const footerBanners = banners.filter(
    (banner) =>
      banner.type === "slider" &&
      banner.place === "homepage" &&
      banner.isActive === true
  );
  
  const items = footerBanners.map((banner) => (
    <div className="banner" key={1}>
      <div className="banner-content">
        <h4 className="banner-content__subtitle">Best Product</h4>
        <h2 className="banner-content__title">{banner?.title}</h2>
        <p className="banner-content__desc">{banner?.subtitle}</p>
        <div className="banner-content__buttons">
          <Link to="/shop" className="btn btn--base pill">
            SHOP NOW
          </Link>
          <div className="button-shape">
            <img
              src="https://template.viserlab.com/viserpet/demos/assets/images/shapes/button-shape.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="banner-thumb">
        <img src={banner?.imageUrl} alt="" />
        <div className="banner-thumb__shape">
          <img
            src="https://template.viserlab.com/viserpet/demos/assets/images/shapes/banner-shape.png"
            alt=""
          />
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <section className="banner-section pt-60 pb-60">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-3">
              <nav className="category">
                <span className="close-sidebar d-lg-none d-block">
                  <i className="las la-times"></i>
                </span>
                <ul className="category-menu">
                  {categories
                    .filter((category) => category.isCreateAsParentCategory)
                    .map((category) => (
                      <li
                        key={category._id}
                        className={`category-menu__item ${
                          category.subcategories ? "has-dropdown" : ""
                        }`}
                      >
                        <Link
                          to={`/shop/${category.name.replace(/\s+/g, "-")}`}
                          className="category-menu__link"
                        >
                          <span className="category-menu__thumb">
                            <img src={category.image} alt={category.name} />
                          </span>{" "}
                          {category.name}
                          {category.subcategories && (
                            <span className="category-menu__icon">
                              <i className="las la-angle-down"></i>
                            </span>
                          )}
                        </Link>
                        {category.subcategories && (
                          <ul className="category-dropdown">
                            {category.subcategories.map((sub) => (
                              <li
                                key={sub.id}
                                className="category-dropdown__item"
                              >
                                <Link
                                  to="/shop"
                                  className="category-dropdown__link"
                                >
                                  <span className="category-dropdown__thumb">
                                    <img src={sub.image} alt={sub.name} />
                                  </span>{" "}
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </nav>
            </div>

            <div className="col-lg-9 col-md-12">
              <AliceCarousel
                items={items}
                autoPlay
                autoPlayInterval={2000}
                infinite
                disableButtonsControls
                disableDotsControls
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
