import Toppage from "../../Components/Toppage";
import Serive from "../Home/Serive";
import Testimonial from "../Testimonial";

function About() {
  return (
    <>
    <Toppage pagename={"About Us"}/>
      <div className="about-section py-120">
        <div className="container">
          <div className="row gy-5 flex-wrap-reverse align-items-center">
            <div className="col-lg-6">
              <div className="about-thumb">
                <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about02.png" alt="image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="section-heading style-two">
                  <h4 className="section-heading__subtitle"> About Us </h4>
                  <div className="col-md-6">
                    <h3 className="section-heading__title style-two ">
                      {" "}
                      Were Always Here For Our Customers.{" "}
                      <span className="section-heading__bars style-two"></span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="about-us">
                <p className="about-us__desc">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from making it overyears old. Richard McClintock Latin
                  professor at Hampden-Sydney
                </p>
                <div className="d-flex justify-content-betwwen flex-wrap mb-4">
                  <ul className="text-menu style">
                    <li className="text-menu__item">
                      <span className="text-menu__icon">
                        <i className="fas fa-check"></i>
                      </span>{" "}
                      Deals & Promotions{" "}
                    </li>
                    <li className="text-menu__item">
                      <span className="text-menu__icon">
                        <i className="fas fa-check"></i>
                      </span>{" "}
                      Service agreement
                    </li>
                  </ul>
                  <ul className="text-menu">
                    <li className="text-menu__item">
                      <span className="text-menu__icon">
                        <i className="fas fa-check"></i>
                      </span>{" "}
                      Nsectetur cing elit{" "}
                    </li>
                    <li className="text-menu__item">
                      <span className="text-menu__icon">
                        <i className="fas fa-check"></i>
                      </span>{" "}
                      Printing and typesetting{" "}
                    </li>
                  </ul>
                </div>
                <div className="about-us-author">
                  <div className="about-us-author__info d-flex align-items-center">
                    <div className="about-us-author__thumb">
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about03.png"
                        alt=""
                      />
                    </div>
                    <div className="about-us-author__title">
                      <h6 className="about-us-author__name">
                        {" "}
                        Dianne Russell{" "}
                      </h6>
                      <span className="about-us-author__customer">
                        {" "}
                        Customer{" "}
                      </span>
                    </div>
                  </div>
                  <h5 className="about-us-author__text">
                    Over{" "}
                    <span className="about-us-author__text-style">
                      {" "}
                      150,000+
                    </span>{" "}
                    client all over the world.
                  </h5>
                </div>
                <div className="about-us-footer">
                  <span className="about-us-footer__text">
                    Want to learn more about us?{" "}
                    <a
                      href="product-two-details.html"
                      className="about-us-footer__link"
                    >
                      {" "}
                      Click here{" "}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="why-choose pt-120">
        <div className="why-choose__bg">
          <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about04.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading ">
                <h4 className="section-heading__subtitle text-white">
                  {" "}
                  Choose Us{" "}
                </h4>
                <h3 className="section-heading__title style-two text-white style-three">
                  {" "}
                  Why Choose Us{" "}
                  <span className="section-heading__bars style-three"></span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4 col-sm-6 col-xsm-6">
              <div className="choose-item">
                <div className="choose-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about05.png" alt="" />
                </div>
                <div className="choose-item__content">
                  <h4 className="choose-item__title"> Modern Pet Toy </h4>
                  <p className="choose-item__desc">
                    Learn Content By Interacting Anything Expert Lesson A video.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xsm-6">
              <div className="choose-item">
                <div className="choose-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about06.png" alt="" />
                </div>
                <div className="choose-item__content">
                  <h4 className="choose-item__title">
                    {" "}
                    Healthy Pet Nutritions{" "}
                  </h4>
                  <p className="choose-item__desc">
                    Learn Content By Interacting Anything Expert Lesson A video.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xsm-6">
              <div className="choose-item">
                <div className="choose-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about07.png" alt="" />
                </div>
                <div className="choose-item__content">
                  <h4 className="choose-item__title"> Quality & Safety </h4>
                  <p className="choose-item__desc">
                    Learn Content By Interacting Anything Expert Lesson A video.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xsm-6 d-lg-none d-block">
              <div className="choose-item">
                <div className="choose-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about05.png" alt="" />
                </div>
                <div className="choose-item__content">
                  <h4 className="choose-item__title"> Modern Pet Toy </h4>
                  <p className="choose-item__desc">
                    Learn Content By Interacting Anything Expert Lesson A video.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      <div className="gallery-section">
        <div className="container-fluid px-0">
          <div className="row gx-0">
            <div className="col-lg-3 col-sm-6 col-xxsm-6">
              <div className="gallery-item">
                <div className="gallery-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about09.png" alt="" />
                  <div className="hover-overlay">
                    <a
                      href="https://www.instagram.com"
                      className="hover-overlay__icon"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xxsm-6">
              <div className="gallery-item">
                <div className="gallery-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about10.png" alt="" />
                  <div className="hover-overlay">
                    <a
                      href="https://www.instagram.com"
                      className="hover-overlay__icon"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xxsm-6">
              <div className="gallery-item">
                <div className="gallery-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about12.png" alt="" />
                  <div className="hover-overlay">
                    <a
                      href="https://www.instagram.com"
                      className="hover-overlay__icon"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xxsm-6">
              <div className="gallery-item">
                <div className="gallery-item__thumb">
                  <img src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/about/about11.png" alt="" />
                  <div className="hover-overlay">
                    <a
                      href="https://www.instagram.com"
                      className="hover-overlay__icon"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Serive />
    </>
  );
}

export default About;
