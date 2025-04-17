import { useEffect } from "react";
import useGenarlStore from "../Store/GenralStore";

function Newofferbanner() {
  const { banners, fetchBanners } = useGenarlStore();
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  const footerBanners = banners.filter(
    (banner) =>
      banner.type === "normal" &&
      banner.place === "footer" &&
      banner.isActive === true
  );

  
  return (
    <>
      <div className="new-offer-section py-60">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <a href="product-category.html" className="new-offer-content">
                {footerBanners.map((banner, index) => (
                  <img
                    key={index}
                    src={banner?.imageUrl}
                    alt={`banner-${index}`}
                  />
                ))}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newofferbanner;
