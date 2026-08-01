import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-[80px] mb-4">&#10003;</div>
        <h5 className="text-center text-[25px] text-[#000000a1] mb-6">
          Your order is successful!
        </h5>
        <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-md text-[16px] font-medium hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
