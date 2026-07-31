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
    { label: "Dashboard", to: "/dashboard", icon: <RxDashboard size={16} /> },
    {
      label: "All Orders",
      to: "/dashboard-orders",
      icon: <FiShoppingBag size={16} />,
    },
    {
      label: "All Products",
      to: "/dashboard-products",
      icon: <FiPackage size={16} />,
    },
    {
      label: "Create Product",
      to: "/dashboard-create-product",
      icon: <AiOutlineFolderAdd size={16} />,
    },
    {
      label: "All Events",
      to: "/dashboard-events",
      icon: <MdOutlineLocalOffer size={16} />,
    },
    {
      label: "Create Event",
      to: "/dashboard-create-event",
      icon: <VscNewFile size={16} />,
    },
    {
      label: "Withdraw Money",
      to: "/dashboard-withdraw-money",
      icon: <CiMoneyBill size={16} />,
    },
    {
      label: "Shop Inbox",
      to: "/dashboard-messages",
      icon: <BiMessageSquareDetail size={16} />,
    },
    {
      label: "Discount Codes",
      to: "/dashboard-coupouns",
      icon: <AiOutlineGift size={16} />,
    },
    {
      label: "Refunds",
      to: "/dashboard-refunds",
      icon: <HiOutlineReceiptRefund size={16} />,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: <CiSettings size={16} />,
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
              src="https://images.rawpixel.com/image_200/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%20200w,%20https://images.rawpixel.com/image_400/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%20400w,%20https://images.rawpixel.com/image_600/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%20600w,%20https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%201600w,%20https://images.rawpixel.com/image_1100/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%202400w,%20https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTExXzEuanBn.jpg%203000w"
              alt=""
              className="w-[100px] h-auto"
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
