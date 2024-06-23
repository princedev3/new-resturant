"use client"
import CheckoutForm from '@/components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const[clientSecret,setClientSecret]= useState("")
  const {id}=useParams()

  useEffect(()=>{
    const makeRequest = async()=>{
      try {
        const res = await fetch(`http://localhost:3000/api/create-Intent/${id}`,{
          method:"POST",

        })
        const data = await res.json()
        setClientSecret(data.clientSecret)
      
      } catch (error) {
        console.log(error)
      }
    }
    makeRequest()
  },[id])

  

  const options = {  
    clientSecret,
    appearance:{
      theme: 'stripe',
    },
  };
  return (
    <div>
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment