import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateEvent from "../../components/Shop/CreateEvent";

const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full justify-center flex">
            <CreateEvent />
        </div>
    </div>
  )
}

export default ShopCreateEvents