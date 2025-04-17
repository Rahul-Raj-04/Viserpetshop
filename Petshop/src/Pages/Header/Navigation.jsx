import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore";
import { LogOut, User } from "lucide-react";
import useCartStore from "../Store/useCartStore";
import { useEffect, useState } from "react";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const { authUser, logout, settings, fetchSettings } = useAuthStore();
  const { cart, fetchCart } = useCartStore();

  useEffect(() => {
    if (authUser) {
      fetchCart();
    }
  }, [authUser, fetchCart]);

  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [settings, fetchSettings]); // ✅ Runs only if settings is not already present

  return (
    <>
      <div className="body-overlay"></div>
      <header className="main-header  fixed-header">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="navbar-toggler header-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span id="hiddenNav">
                <i className="las la-bars"></i>
              </span>
            </button>
            <div className="header-category-two">
              <Link className="navbar-brand " to="/">
                <span className="logo">
                  <img src={settings?.siteLogo} alt="" />
                </span>
              </Link>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav nav-menu me-auto">
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="/" role="button">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="/shop" role="button">
                    Shop
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    to="/Blog
"
                    role="button"
                  >
                    Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className=" nav-item">
                  <div className="toggle-search-box d-none d-lg-block">
                    <button
                      type="button"
                      className=""
                      data-bs-toggle="modal"
                      data-bs-target="#search-box"
                      data-bs-whatever="@mdo"
                    >
                      <i className="las la-search"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="header-info">
              <div className="toggle-search-box d-lg-none d-block">
                <button
                  type="button"
                  className=""
                  data-bs-toggle="modal"
                  data-bs-target="#search-box"
                  data-bs-whatever="@mdo"
                >
                  <i className="las la-search"></i>
                </button>
              </div>
              <div className="header-info__wishlist">
                <Link to="/wishlist" className="header-info__link">
                  <i className="far fa-heart"></i>
                </Link>
              </div>
              <div className="header-info__cart">
                <Link to="/cart" className="header-info__link">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                <span className="header-info__cart-quantity">
                  {cart?.items?.length || 0}
                </span>
              </div>
              {authUser ? (
                <div className="header-info__user d-flex align-items-center gap-4">
                  <Link to="/profile" className="header-info__link">
                    <User size={18} />
                  </Link>
                  <LogOut
                    size={18}
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ) : (
                <div className="header-info__user">
                  <Link to="/login" className="header-info__link">
                    <User size={18} />
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="overlay-search-box position-relative">
        <div
          className="modal fade"
          id="search-box"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="search-overlay-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="las la-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSearch}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="search-box">
                        <div className="input--group">
                          <input
                            type="text"
                            className="form--control style-two"
                            placeholder="Search...."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <button className="search-btn" type="submit">
                            <i className="las la-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
