import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full justify-center flex">
            <AllCoupons />
        </div>
    </div>
  )
}

export default ShopAllCoupouns