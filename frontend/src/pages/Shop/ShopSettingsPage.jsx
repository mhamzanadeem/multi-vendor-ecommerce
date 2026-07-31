import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <ShopSettings />
      <Footer />
    </div>
  );
};

export default ShopSettingsPage;