import { useEffect,  } from "react";
import useAdminStore from "../../Store/useAdminStore";
import { Link, useNavigate } from "react-router-dom";
import useOrderStore from "../../Store/useOrderStore";
import useProductStore from "../../Store/useProductStore";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function Dashboard() {
  const navigate = useNavigate();
  const { products, fetchProducts, deleteProduct } = useProductStore();

  const { transactions, fetchTransactions } = useOrderStore();
  const { getDashboardHeaderData, dashboardHeaderData } = useAdminStore();
  useEffect(() => {
    const userId = localStorage.getItem("adminId");
    if (userId) {
      getDashboardHeaderData(userId);
    }
  }, [getDashboardHeaderData]);
  useEffect(() => {
    fetchTransactions(); // ✅ All transactions fetch karo
  }, [fetchTransactions]);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
      }
    });
  };
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [500, 700, 400, 800, 600, 750],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
      },
    ],
  };
  
  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales" },
    },
  };
  
  const categoryData = {
    labels: ["Electronics", "Fashion", "Home", "Books", "Sports"],
    datasets: [
      {
        label: "Categories",
        data: [300, 200, 150, 100, 250],
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#3b82f6",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
  };
  
  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between items-end flex-wrap">
          <div className="page-title mb-7">
            <h3 className="mb-0 text-4xl">Dashboard</h3>
            <p className="text-textBody m-0">Welcome to your dashboard</p>
          </div>
          <div className=" mb-7">
            <Link to="/add-product" className="tp-btn px-5 py-2">
              Add Product
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="widget-item bg-white p-6 flex justify-between rounded-md">
            <div>
              <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
                {dashboardHeaderData?.todayOrderCount}
              </h4>
              <p className="text-tiny leading-4">Today Orders </p>
              <div className="badge space-x-1">
                <span> {dashboardHeaderData?.todayOrderGrowth}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1V18C1 19.66 2.34 21 4 21H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16L8.59 10.64C9.35 9.76001 10.7 9.7 11.52 10.53L12.47 11.48C13.29 12.3 14.64 12.25 15.4 11.37L20 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-success">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.37 7.87988H16.62"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.38 7.87988L6.13 8.62988L8.38 6.37988"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.37 14.8799H16.62"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.38 14.8799L6.13 15.6299L8.38 13.3799"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="widget-item bg-white p-6 flex justify-between rounded-md">
            <div>
              <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
                ₹{dashboardHeaderData?.totalOrderValue}
              </h4>
              <p className="text-tiny leading-4">Total Sales</p>
              <div className="badge space-x-1 text-purple bg-purple/10">
                <span>{dashboardHeaderData?.salesGrowth}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512.001 512.001"
                  width="12"
                  height="12"
                >
                  <path
                    fill="currentColor"
                    d="M506.35,80.699c-7.57-7.589-19.834-7.609-27.43-0.052L331.662,227.31l-42.557-42.557c-7.577-7.57-19.846-7.577-27.423,0 L89.076,357.36c-7.577,7.57-7.577,19.853,0,27.423c3.782,3.788,8.747,5.682,13.712,5.682c4.958,0,9.93-1.894,13.711-5.682 l158.895-158.888l42.531,42.524c7.57,7.57,19.808,7.577,27.397,0.032l160.97-160.323 C513.881,100.571,513.907,88.288,506.35,80.699z"
                  />
                  <path
                    fill="currentColor"
                    d="M491.96,449.94H38.788V42.667c0-10.712-8.682-19.394-19.394-19.394S0,31.955,0,42.667v426.667 c0,10.712,8.682,19.394,19.394,19.394H491.96c10.712,0,19.394-8.682,19.394-19.394C511.354,458.622,502.672,449.94,491.96,449.94z"
                  />
                  <path
                    fill="currentColor"
                    d="M492.606,74.344H347.152c-10.712,0-19.394,8.682-19.394,19.394s8.682,19.394,19.394,19.394h126.061v126.067 c0,10.705,8.682,19.394,19.394,19.394S512,249.904,512,239.192V93.738C512,83.026,503.318,74.344,492.606,74.344z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-purple">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 21H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.59998 7.37988H2C1.45 7.37988 1 7.82988 1 8.37988V16.9999C1 17.5499 1.45 17.9999 2 17.9999H3.59998C4.14998 17.9999 4.59998 17.5499 4.59998 16.9999V8.37988C4.59998 7.82988 4.14998 7.37988 3.59998 7.37988Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.7999 4.18994H9.19995C8.64995 4.18994 8.19995 4.63994 8.19995 5.18994V16.9999C8.19995 17.5499 8.64995 17.9999 9.19995 17.9999H10.7999C11.3499 17.9999 11.7999 17.5499 11.7999 16.9999V5.18994C11.7999 4.63994 11.3499 4.18994 10.7999 4.18994Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.9999 1H16.3999C15.8499 1 15.3999 1.45 15.3999 2V17C15.3999 17.55 15.8499 18 16.3999 18H17.9999C18.5499 18 18.9999 17.55 18.9999 17V2C18.9999 1.45 18.5499 1 17.9999 1Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="widget-item bg-white p-6 flex justify-between rounded-md">
            <div>
              <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
                {dashboardHeaderData?.totalUserCount}
              </h4>
              <p className="text-tiny leading-4">New Customers This Month</p>
              <div className="badge space-x-1 text-info bg-info/10">
                <span>{dashboardHeaderData?.userGrowth}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512.001 512.001"
                  width="12"
                  height="12"
                >
                  <path
                    fill="currentColor"
                    d="M506.35,80.699c-7.57-7.589-19.834-7.609-27.43-0.052L331.662,227.31l-42.557-42.557c-7.577-7.57-19.846-7.577-27.423,0 L89.076,357.36c-7.577,7.57-7.577,19.853,0,27.423c3.782,3.788,8.747,5.682,13.712,5.682c4.958,0,9.93-1.894,13.711-5.682 l158.895-158.888l42.531,42.524c7.57,7.57,19.808,7.577,27.397,0.032l160.97-160.323 C513.881,100.571,513.907,88.288,506.35,80.699z"
                  />
                  <path
                    fill="currentColor"
                    d="M491.96,449.94H38.788V42.667c0-10.712-8.682-19.394-19.394-19.394S0,31.955,0,42.667v426.667 c0,10.712,8.682,19.394,19.394,19.394H491.96c10.712,0,19.394-8.682,19.394-19.394C511.354,458.622,502.672,449.94,491.96,449.94z"
                  />
                  <path
                    fill="currentColor"
                    d="M492.606,74.344H347.152c-10.712,0-19.394,8.682-19.394,19.394s8.682,19.394,19.394,19.394h126.061v126.067 c0,10.705,8.682,19.394,19.394,19.394S512,249.904,512,239.192V93.738C512,83.026,503.318,74.344,492.606,74.344z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-info">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6.16C16.94 6.15 16.87 6.15 16.81 6.16C15.43 6.11 14.33 4.98 14.33 3.58C14.33 2.15 15.48 1 16.91 1C18.34 1 19.49 2.16 19.49 3.58C19.48 4.98 18.38 6.11 17 6.16Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.9699 13.44C17.3399 13.67 18.8499 13.43 19.9099 12.72C21.3199 11.78 21.3199 10.24 19.9099 9.30004C18.8399 8.59004 17.3099 8.35003 15.9399 8.59003"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.96998 6.16C5.02998 6.15 5.09998 6.15 5.15998 6.16C6.53998 6.11 7.63998 4.98 7.63998 3.58C7.63998 2.15 6.48998 1 5.05998 1C3.62998 1 2.47998 2.16 2.47998 3.58C2.48998 4.98 3.58998 6.11 4.96998 6.16Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99994 13.44C4.62994 13.67 3.11994 13.43 2.05994 12.72C0.649941 11.78 0.649941 10.24 2.05994 9.30004C3.12994 8.59004 4.65994 8.35003 6.02994 8.59003"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 13.63C10.94 13.62 10.87 13.62 10.81 13.63C9.42996 13.58 8.32996 12.45 8.32996 11.05C8.32996 9.61997 9.47995 8.46997 10.91 8.46997C12.34 8.46997 13.49 9.62997 13.49 11.05C13.48 12.45 12.38 13.59 11 13.63Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.08997 16.78C6.67997 17.72 6.67997 19.26 8.08997 20.2C9.68997 21.27 12.31 21.27 13.91 20.2C15.32 19.26 15.32 17.72 13.91 16.78C12.32 15.72 9.68997 15.72 8.08997 16.78Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="widget-item bg-white p-6 flex justify-between rounded-md">
            <div>
              <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
                {dashboardHeaderData?.totalOrderCount}
              </h4>
              <p className="text-tiny leading-4">All Orders</p>
              <div className="badge space-x-1 text-warning bg-warning/10">
                <span> {dashboardHeaderData?.orderGrowth}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512.001 512.001"
                  width="12"
                  height="12"
                >
                  <path
                    fill="currentColor"
                    d="M506.35,80.699c-7.57-7.589-19.834-7.609-27.43-0.052L331.662,227.31l-42.557-42.557c-7.577-7.57-19.846-7.577-27.423,0 L89.076,357.36c-7.577,7.57-7.577,19.853,0,27.423c3.782,3.788,8.747,5.682,13.712,5.682c4.958,0,9.93-1.894,13.711-5.682 l158.895-158.888l42.531,42.524c7.57,7.57,19.808,7.577,27.397,0.032l160.97-160.323 C513.881,100.571,513.907,88.288,506.35,80.699z"
                  />
                  <path
                    fill="currentColor"
                    d="M491.96,449.94H38.788V42.667c0-10.712-8.682-19.394-19.394-19.394S0,31.955,0,42.667v426.667 c0,10.712,8.682,19.394,19.394,19.394H491.96c10.712,0,19.394-8.682,19.394-19.394C511.354,458.622,502.672,449.94,491.96,449.94z"
                  />
                  <path
                    fill="currentColor"
                    d="M492.606,74.344H347.152c-10.712,0-19.394,8.682-19.394,19.394s8.682,19.394,19.394,19.394h126.061v126.067 c0,10.705,8.682,19.394,19.394,19.394S512,249.904,512,239.192V93.738C512,83.026,503.318,74.344,492.606,74.344z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 bg-warning">
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17004 6.43994L11 11.5499L19.77 6.46991"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 20.6099V11.5399"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.61 8.17V13.83C20.61 13.88 20.61 13.92 20.6 13.97C19.9 13.36 19 13 18 13C17.06 13 16.19 13.33 15.5 13.88C14.58 14.61 14 15.74 14 17C14 17.75 14.21 18.46 14.58 19.06C14.67 19.22 14.78 19.37 14.9 19.51L13.07 20.52C11.93 21.16 10.07 21.16 8.92999 20.52L3.59 17.56C2.38 16.89 1.39001 15.21 1.39001 13.83V8.17C1.39001 6.79 2.38 5.11002 3.59 4.44002L8.92999 1.48C10.07 0.84 11.93 0.84 13.07 1.48L18.41 4.44002C19.62 5.11002 20.61 6.79 20.61 8.17Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 17C22 18.2 21.47 19.27 20.64 20C19.93 20.62 19.01 21 18 21C15.79 21 14 19.21 14 17C14 15.74 14.58 14.61 15.5 13.88C16.19 13.33 17.06 13 18 13C20.21 13 22 14.79 22 17Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.25 15.75V17.25L17 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

       

        <div className="chart-main-wrapper mb-6 grid grid-cols-12 gap-6">
          <div className=" col-span-12 2xl:col-span-7">
            <div className="chart-single bg-white py-3 px-3 sm:py-10 sm:px-10 h-fit rounded-md">
              <h3 className="text-xl">Sales Statics</h3>
              <div className="md:h-[252px] 2xl:h-[398px] w-full text-center items-center  flex">
              <Doughnut data={categoryData} options={categoryOptions} />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 2xl:col-span-5 space-y-6">
            <div className="chart-widget bg-white p-4 sm:p-10 rounded-md">
              <h3 className="text-xl mb-8">Most Selling Category</h3>
              <div className="md:h-[252px] 2xl:h-[398px] w-full">
              <Line data={salesData} options={salesOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="bg-white p-8 col-span-12 xl:col-span-6 2xl:col-span-6 rounded-md">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
                Transactions
              </h2>
              <Link
                to="/transaction"
                className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
              >
                View All
              </Link>
            </div>
            <div className="space-y-5">
              {transactions.slice(0, 5).map((trans, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between"
                >
                  <div className="m-2 mb:sm-0 flex items-center space-x-3">
                    <div className="avatar"></div>
                    <div>
                      <h4 className="text-base text-slate-700 mb-[6px] leading-none">
                        #{trans.transactionId}
                      </h4>
                      <p className="text-sm text-slate-400 line-clamp-1 m-0 leading-none">
                        {new Date(trans.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-success mb-0">
                    {" "}
                    ₹{trans.totalAmount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 col-span-12 xl:col-span-6 2xl:col-span-6 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
                Today Orders
              </h3>
              <Link
                to="/order-list"
                className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
              >
                View All
              </Link>
            </div>

            <div className="overflow-scroll 2xl:overflow-visible">
              <div className="w-[700px] 2xl:w-full">
                <table className="w-full text-base text-left text-gray-500">
                  <thead className="bg-white">
                    <tr className="border-b border-gray6 text-tiny">
                      <th
                        scope="col"
                        className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
                      >
                        ORD ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardHeaderData?.todayOrdersData.map((item, index) => {
                      const productCount = item.products.length;
                      const firstProductName = item.products[0]?.name; // Get first product name
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b border-gray6 last:border-0 text-start"
                        >
                          {/* ✅ Show first product name and "+X more" if there are multiple products */}
                          <td className="pr-8 whitespace-nowrap">
                            <Link
                              to="#"
                              className="font-medium text-heading text-hover-primary"
                            >
                              {firstProductName}{" "}
                              {productCount > 1
                                ? `(+${productCount - 1} more)`
                                : ""}
                            </Link>
                          </td>
                          <td className="px-3 py-3 font-normal text-slate-600">
                            {item.orderID}
                          </td>
                          <td className="px-3 py-3 font-normal text-slate-600">
                            ₹{item.totalAmount}
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-[11px] text-success px-3 py-1 rounded-md leading-none bg-success/10 font-medium">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[1400px] 2xl:w-full">
            <div className="grid grid-cols-12 border-b border-gray rounded-t-md bg-white px-10 py-5">
              <div className="table-information col-span-4">
                <h3 className="font-medium tracking-wide text-slate-800 text-lg mb-0 leading-none">
                  Product List
                </h3>
              </div>
            </div>

            <div className="">
              <div className="relative rounded-b-md bg-white px-10 py-7 ">
                <table className="w-full text-base text-left text-gray-500">
                  <thead className="bg-white">
                    <tr className="border-b border-gray6 text-tiny">
                      <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                        Item
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold">
                        Product ID
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold">
                        Category
                      </th>
                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold">
                        Price
                      </th>

                      <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[14%] 2xl:w-[12%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.slice(0, 8).map((product) => (
                        <tr
                          key={product._id}
                          className="bg-white border-b border-gray6 last:border-0 text-start"
                        >
                          <td className="pr-8 whitespace-nowrap">
                            <div className="font-medium text-heading text-hover-primary">
                              {product.name}
                            </div>
                          </td>
                          <td className="px-3 py-3 font-normal text-slate-600">
                            #{product._id}
                          </td>
                          <td className="px-3 py-3 font-normal text-slate-600">
                            {product.category?.name || "Uncategorized"}
                          </td>
                          <td className="px-3 py-3 font-normal text-slate-600">
                            ₹{product.price.toFixed(2)}
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  navigate(`/edit-product/${product._id}`)
                                }
                                className="bg-success hover:bg-green-600 text-white inline-block text-center leading-5 text-tiny font-medium pt-2 pb-[6px] px-4 rounded-md"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="bg-white text-slate-700 border border-slate-200 hover:bg-danger hover:border-danger hover:text-white inline-block text-center leading-5 text-tiny font-medium pt-[6px] pb-[5px] px-4 rounded-md"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-5 text-gray-500 font-medium"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
