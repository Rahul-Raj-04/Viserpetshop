/* eslint-disable react/prop-types */
const DashboardOverview = ({ orderCounts }) => (
  <div>
    <h3>Dashboard Overview</h3>
    <div className="container">
      <div className="row gy-4 justify-content-center">
        {["All Orders", "Pending", "Delivered"].map((title, index) => (
          <div key={title} className="col-lg-4 col-md-6 col-sm-6">
            <div className="contact-item">
              <div className="contact-item__thumb">
                <img
                  src="https://template.viserlab.com/viserpet/demos/assets/images/icons/contact01.png"
                  alt={title}
                />
              </div>
              <div className="contact-item__content">
                <h5 className="contact-item__title">{title}</h5>
                <p className="contact-item__desc">
                  {index === 0
                    ? orderCounts.all
                    : index === 1
                    ? orderCounts.pending
                    : orderCounts.delivered}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardOverview;
