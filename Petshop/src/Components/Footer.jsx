import { Link } from "react-router-dom";
import useAuthStore from "../Pages/Store/useAuthStore";
import { useEffect } from "react";

function Footer() {
  const { settings, fetchSettings } = useAuthStore();
  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [settings, fetchSettings]); // ✅ Runs only if settings is not already present
  return (
    <>
      <footer className="footer-area section-bg-light bg-img">
        <div className="pb-60 pt-120">
          <div className="container">
            <div className="row justify-content-center gy-5">
              <div className="col-xl-3 col-sm-6">
                <div className="footer-item">
                  <div className="footer-item__logo">
                    <Link to="index">
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/logo/footer-logo02.png"
                        alt=""
                      />
                    </Link>
                  </div>
                  <p className="footer-item__desc">
                    
                  {settings?.siteDescription}{" "}
                  </p>
                  <ul className="social-list">
                    <li className="social-list__item">
                      <Link
                        to={settings?.socialLinks?.facebook}
                        className="social-list__link"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li className="social-list__item">
                      <Link
                       to={settings?.socialLinks?.twitter}
                        className="social-list__link"
                      >
                        
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li className="social-list__item">
                      <Link
                      to={settings?.socialLinks?.linkedin}
                        className="social-list__link"
                      >
                        
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li className="social-list__item">
                      <Link
                        to={settings?.socialLinks?.instagram}
                        className="social-list__link"
                      >
                        
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-1 d-xl-block d-none"></div>
              <div className="col-xl-2 col-sm-6">
                <div className="footer-item">
                  <h5 className="footer-item__title"> Pages </h5>
                  <ul className="footer-menu">
                    <li className="footer-menu__item">
                      <Link to="about" className="footer-menu__link">
                        
                        About Us
                      </Link>
                    </li>
                    <li className="footer-menu__item">
                      <Link to="/faq" className="footer-menu__link">
                        
                        Faq
                      </Link>
                    </li>
                    <li className="footer-menu__item">
                      <Link to="/cart" className="footer-menu__link">
                        Cart
                      </Link>
                    </li>
                    <li className="footer-menu__item">
                      <Link to="/blog" className="footer-menu__link">
                        
                        Blog
                      </Link>
                    </li>
                   
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-sm-6">
                <div className="footer-item">
                  <h5 className="footer-item__title"> Useful link </h5>
                  <ul className="footer-menu">
                    <li className="footer-menu__item">
                      <Link to="/shop" className="footer-menu__link">
                        
                        Product Category
                      </Link>
                    </li>
                   
                    <li className="footer-menu__item">
                      <Link to="login" className="footer-menu__link">
                        Login
                      </Link>
                    </li>
                    <li className="footer-menu__item">
                      <Link to="registration" className="footer-menu__link">
                        
                        Registration
                      </Link>
                    </li>
                    <li className="footer-menu__item">
                      <Link to="contact" className="footer-menu__link">
                        
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-1 d-xl-block d-none"></div>
              <div className="col-xl-3 col-sm-6">
                <div className="footer-item">
                  <h5 className="footer-item__title">Subscribe now</h5>
                  <div className="subscriber-form mb-3">
                    <input
                      type="text"
                      className=" form--control style-two"
                      placeholder="Email Address"
                      aria-label="Recipient's username"
                    />
                    <button className="btn btn--base subscribe-button">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                  <p>
                    Subscribe to our newsletter and get 10% off your first
                    purchase..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-footer section-bg py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bottom-footer__text">
                  
                  Copyright &copy; 2025 . Designed and Developed by Brandbell
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
