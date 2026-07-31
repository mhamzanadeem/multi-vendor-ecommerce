import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllRefundOrders from "../../components/Shop/AllRefundOrders";

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
</div>
  )
}

export default ShopAllRefunds