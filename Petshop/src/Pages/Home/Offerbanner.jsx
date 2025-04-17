import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGenarlStore from "../Store/GenralStore";

function Offerbanner() {
  const { banners, fetchBanners } = useGenarlStore();
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  const footerBanners = banners.filter(
    (banner) =>
      banner.type === "normal" &&
      banner.place === "offer" &&
      banner.isActive === true
  );
  return (
    <>
      <div className="offer-section pt-60 pb-60">
        <div className="container">
          <div className="row gy-4">
            {footerBanners.map((banner, index) => (
              <div key={index} className="col-lg-6">
                <Link to="/shop" className="offer">
                  <img src={banner?.imageUrl} alt={`banner-${index}`} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Offerbanner;
