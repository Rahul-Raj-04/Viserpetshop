import { Link } from "react-router-dom"

function BestDeal() {
  
  return (
    <>
       <div className="best-deals-section py-60">
        <div className="container-fluid p-0">
          <div className="row gx-0 justify-content-center flex-wrap-reverse">
            <div className="col-xl-4">
              <div className="deal-thumb">
                <img
                  src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/deal-img.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-8">
              <div
                className="deal-counter py-120"
                style={{
                  backgroundImage:
                    "url(https://template.viserlab.com/viserpet/demos/assets/images/thumbs/deal-product-img.png)",
                }}
              >
                <div className="section-heading style-three">
                  <h4 className="section-heading__subtitle">Best products</h4>
                  <h3 className="section-heading__title">
                    Best Deals Of T he Week!
                  </h3>
                </div>
                <div id="countdown-container"></div>
                <div className="deal-counter__footer text-center">
                  <p className="deal-counter__title mb-3">Dummy Product Name</p>
                  <h6 className="deal-counter__price">
                    <span className="deal-counter__price-new">₹620</span> ₹520
                  </h6>
                </div>
                <div className="text-center">
                  <Link
                    to="/shop"
                    className="btn btn--base pill"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BestDeal
