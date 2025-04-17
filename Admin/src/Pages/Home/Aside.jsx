/* eslint-disable react/prop-types */
import {
  BadgePercent,
  Blocks,
  ChevronRight,
  CircleUserRound,
  Gift,
  Grid2x2,
  ListCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../../Store/useProductStore";

function Aside({ sideMenu, setSideMenu }) {
  const [isMobile, setIsMobile] = useState(false);
  const [nav, setNav] = useState(null);
  const { fetchWebsiteSettings, websiteSettings } = useProductStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const loadSettings = async () => {
      await fetchWebsiteSettings();
    };
    loadSettings();
  }, [fetchWebsiteSettings]);
  const menuItems = [
    { id: 0, label: "Dashboard", icon: <Grid2x2 size={18} />, link: "/" },
    {
      id: 10,
      label: "Banner",
      icon: <ListCheck size={18} />,
      subMenu: [
        { label: "Banner List", link: "/Banner" },
       
      ],
    },
    {
      id: 1,
      label: "Products",
      icon: <Gift size={18}  />,
      subMenu: [
        { label: "Product List", link: "/product-list" },
        { label: "Add Product", link: "/add-product" },
      ],
    },
    {
      id: 2,
      label: "Categories",
      icon: <ShoppingCart size={18}  />,
      link: "/category",
    },
    {
      id: 3,
      label: "Customers",
      icon: <Users size={18} />,
      subMenu: [{ label: "Customers List", link: "/customer-list" }],
    },
    {
      id: 4,
      label: "Orders",
      icon: <ListCheck size={18} />,
      subMenu: [
        { label: "Orders List", link: "/order-list" },
        { label: "Transactions", link: "/transaction" },
      ],
    },
    { id: 5, label: "Reviews", icon: <Sparkles size={18} />, link: "/reviews" },
    {
      id: 6,
      label: "Coupons",
      icon: <BadgePercent size={18} />,
      link: "/coupon",
    },
    {
      id: 7,
      label: "Profile",
      icon: <CircleUserRound size={18} />,
      link: "/profile",
    },
    
  ];
  return (
    <>
      <div className="tp-main-wrapper bg-slate-100 ">
        <aside
          className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray  sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
            sideMenu && isMobile
              ? "translate-x-0"
              : !isMobile
              ? "translate-x-0"
              : "-translate-x-[300px]"
          }`}
        >
          <div className="py-4 pb-8 px-8 border-b border-gray h-[78px]">
            <Link to="/">
              <img
                className="w-[140px] dark:invert"
                src={websiteSettings?.siteLogo || "https://html.hixstudio.net/ebazer/assets/img/logo/logo.svg"}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="px-4 py-5">
            <ul>
              {menuItems.map(({ id, label, icon, link, subMenu }) => (
                <li key={id}>
                  <Link
                    onClick={() => setNav(nav !== id ? id : null)}
                    className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active ${
                      nav === id ? "bg-themeLight text-theme" : ""
                    }`}
                    to={link || "#"}
                  >
                    <span className="inline-block mr-[10px] text-xl">
                      <span className="mr-2">{icon}</span>
                    </span>
                    {label}
                    {subMenu && (
                      <span
                        className={`absolute right-4 transition-transform ${
                          nav === id ? "rotate-90" : ""
                        }`}
                      >
                        <ChevronRight size={18} />
                      </span>
                    )}
                  </Link>
                  {nav === id && subMenu && (
                    <ul className="pl-[42px] pr-[20px] pb-3">
                      {subMenu.map(({ label, link }) => (
                        <li key={label}>
                          <Link
                            to={link}
                            className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-gray pt-3 mt-3">
              <Link
                onClick={() => setNav(nav !== 8 ? 8 : null)}
                to="/site-settings"
                className={`"group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-link-active ${
                  nav === 8 ? "bg-themeLight text-theme" : ""
                }`}
              >
                <span className="inline-block translate-y-[1px] mr-[10px] text-xl">
                  <Store size={18} />
                </span>
                Shop Settings
              </Link>
            </div>
            <div>
              <Link
                onClick={() => setNav(nav !== 9 ? 9 : null)}
                className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-link-active ${
                  nav === 9
                    ? "bg-themeLight hover:bg-themeLight text-theme"
                    : ""
                }`}
                to="#"
              >
                <span className="inline-block translate-y-[1px] mr-[10px] text-xl">
                  <Blocks />
                </span>
                Blogs
                <span
                  className={`absolute right-4 transition-transform duration-300 origin-center w-4 h-4 ${
                    nav === 9 ? "rotate-90" : ""
                  }`}
                >
                  <ChevronRight size={18} />
                </span>
              </Link>
              {nav === 9 && (
                <ul className="pl-[42px] pr-[20px] pb-3">
                  <li>
                    <Link
                      to="/Blog-list"
                      className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                    >
                      Blog 
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Add-blog"
                      className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                    >
                      Add Blog 
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </aside>
      </div>
      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
            sideMenu ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={() => setSideMenu(!sideMenu)}
        ></div>
      )}
    </>
  );
}

export default Aside;
