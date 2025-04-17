function Serive() {
  return (
    <>
      <div
        className="feature-section bg-img py-60"
        style={{
          backgroundImage:
            "url(https://template.viserlab.com/viserpet/demos/assets/images/thumbs/feature/feature-img.png)",
        }}
      >
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-3 col-sm-6 col-xxsm-6">
              <div className="feature-item">
                <div className="feature-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/feature/f04.png"
                    alt=""
                  />
                </div>
                <div className="feature-item__info">
                  <h5 className="feature-item__title">FREE SHIPPING</h5>
                  <span className="feature-item__payment">
                    For All Order Over ₹1000
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xxsm-6">
              <div className="feature-item">
                <div className="feature-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/feature/f03.png"
                    alt=""
                  />
                </div>
                <div className="feature-item__info">
                  <h5 className="feature-item__title">FRIENDLY SUPPORT</h5>
                  <span className="feature-item__payment">
                    {" "}
                    24/7 Customer Support{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xxsm-6">
              <div className="feature-item">
                <div className="feature-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/feature/f02.png"
                    alt=""
                  />
                </div>
                <div className="feature-item__info">
                  <h5 className="feature-item__title">SECURE PAYMENT</h5>
                  <span className="feature-item__payment">
                    100% Secure Payment
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xxsm-6">
              <div className="feature-item">
                <div className="feature-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/feature/f01.png"
                    alt=""
                  />
                </div>
                <div className="feature-item__info">
                  <h5 className="feature-item__title">SHIPPING & RETURN</h5>
                  <span className="feature-item__payment">
                    {" "}
                    within 30days For Refund{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Serive;
