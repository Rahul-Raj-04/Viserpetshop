import { useEffect, useState } from "react";
import Toppage from "../../Components/Toppage";
import useCartStore from "../Store/useCartStore";
import useAuthStore from "../Store/useAuthStore";
import DashboardSidebar from "./DahsBoardsidebar";
import OrdersTable from "./Order";
import DashboardOverview from "./Overview";
import PersonalInfo from "./PersonalInfo";
import ChangePasswordForm from "./ChangePassword";

function Dashboard() {
  const { orders, getUserOrders } = useCartStore();
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");
  const [orderCounts, setOrderCounts] = useState({
    all: 0,
    pending: 0,
    delivered: 0,
  });

  useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  useEffect(() => {
    setOrderCounts({
      all: orders.length,
      pending: orders.filter(({ status }) => status === "Pending").length,
      delivered: orders.filter(({ status }) => status === "Delivered").length,
    });
  }, [orders]);

  return (
    <>
      <Toppage pagename="Dashboard" />
      <div className="blog-section py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                logout={logout}
              />
            </div>
            <div className="col-lg-8">
              {activeTab === "orders" && <OrdersTable orders={orders} />}
              {activeTab === "dashboard" && (
                <DashboardOverview orderCounts={orderCounts} />
              )}
              {activeTab === "personal" && <PersonalInfo />}
              {activeTab === "password" && <ChangePasswordForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
