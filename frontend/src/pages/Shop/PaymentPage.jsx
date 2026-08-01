import React from 'react'
import CheckoutSteps from '../../components/Checkout/CheckoutSteps'
import Footer from '../../components/Layout/Footer'
import Header from '../../components/Layout/Header'
import Payment from "../../components/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Elements stripe={stripePromise}>
         <Payment />
       </Elements>
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage
