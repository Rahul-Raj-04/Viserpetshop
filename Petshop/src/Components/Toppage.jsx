/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";



function Toppage({ pagename }) {
  return (
    <>
      <section
        className="breadcumb py-120 bg-img"
        style={{
          backgroundImage:
            "url(https://template.viserlab.com/viserpet/demos/assets/images/thumbs/breadcumb-img.png)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="breadcumb__wrapper">
                <h1 className="breadcumb__title"> {pagename}</h1>
                <ul className="breadcumb__list">
                  <li className="breadcumb__item">
                    <Link to="/" className="breadcumb__link">
                      {" "}
                      <i className="las la-home"></i> Home
                    </Link>{" "}
                  </li>
                  <li className="breadcumb__item"> / </li>
                  <li className="breadcumb__item">
                    {" "}
                    <span className="breadcumb__item-text">
                      {" "}
                      {pagename}{" "}
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Toppage;
