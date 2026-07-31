import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const { pathname } = useLocation();

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: <RxDashboard size={20} /> },
    {
      label: "All Orders",
      to: "/dashboard-orders",
      icon: <FiShoppingBag size={20} />,
    },
    {
      label: "All Products",
      to: "/dashboard-products",
      icon: <FiPackage size={20} />,
    },
    {
      label: "Create Product",
      to: "/dashboard-create-product",
      icon: <AiOutlineFolderAdd size={20} />,
    },
    {
      label: "All Events",
      to: "/dashboard-events",
      icon: <MdOutlineLocalOffer size={20} />,
    },
    {
      label: "Create Event",
      to: "/dashboard-create-event",
      icon: <VscNewFile size={20} />,
    },
    {
      label: "Withdraw Money",
      to: "/dashboard-withdraw-money",
      icon: <CiMoneyBill size={20} />,
    },
    {
      label: "Shop Inbox",
      to: "/dashboard-messages",
      icon: <BiMessageSquareDetail size={20} />,
    },
    {
      label: "Discount Codes",
      to: "/dashboard-coupouns",
      icon: <AiOutlineGift size={20} />,
    },
    {
      label: "Refunds",
      to: "/dashboard-refunds",
      icon: <HiOutlineReceiptRefund size={20} />,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: <CiSettings size={20} />,
    },
  ];

  const isActive = (to) => {
    if (to === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(to);
  };

  return (
    <div className="bg-white shadow sticky top-0 left-0 z-30">
      <div className="w-full h-[80px] flex items-center justify-between px-4">
        <div>
          <Link to="/dashboard">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center">
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="w-full border-t border-[#eee] overflow-x-auto">
        <div className="flex items-center min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-3 text-[15px] font-[500] whitespace-nowrap border-b-2 ${
                isActive(item.to)
                  ? "text-[crimson] border-[crimson]"
                  : "text-[#555] border-transparent hover:text-[crimson]"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
