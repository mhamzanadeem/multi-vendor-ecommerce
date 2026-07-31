import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
        <div>
            <DashboardHeader />
            <div className="w-full justify-center flex">
               <AllOrders />
            </div>
        </div>
  )
}

export default ShopAllOrders