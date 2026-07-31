import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllEvents from "../../components/Shop/AllEvents";

const ShopAllEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full justify-center flex">
            <AllEvents />
        </div>
    </div>
  )
}

export default ShopAllEvents