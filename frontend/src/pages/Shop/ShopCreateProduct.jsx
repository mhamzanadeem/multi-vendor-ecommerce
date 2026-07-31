import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full justify-center flex">
            <CreateProduct />
        </div>
    </div>
  )
}

export default ShopCreateProduct