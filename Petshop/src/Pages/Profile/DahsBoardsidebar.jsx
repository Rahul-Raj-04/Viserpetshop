/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const DashboardSidebar = ({ activeTab, setActiveTab, logout }) => {
  const sidebarLinks = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "personal", icon: "fas fa-user", label: "Personal Info" },
    { id: "orders", icon: "fas fa-box", label: "Orders" },
    { id: "password", icon: "fas fa-lock", label: "Change Password" },
  ];

  return (
    <div className="blog-sidebar-wrapper">
      <div className="blog-sidebar">
        <h5 className="blog-sidebar__title">Dashboard</h5>
        <ul className="text-list style-category">
          {sidebarLinks.map(({ id, icon, label }) => (
            <li
              key={id}
              className={`text-list__item ${activeTab === id ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Link to="#" className="text-list__link">
                <span className="text-list__icon">
                  <i className={icon}></i>
                </span>
                {label}
              </Link>
            </li>
          ))}
          <li className="text-list__item" onClick={logout}>
            <Link to="#" className="text-list__link">
              <span className="text-list__icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
