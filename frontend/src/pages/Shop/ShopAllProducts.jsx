import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full justify-center flex">
            <AllProducts />
        </div>
    </div>
  )
}

export default ShopAllProducts