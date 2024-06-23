"use client"
import { useCartStore } from '@/libs/store'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Success = () => {

  const {   clearFromCart} = useCartStore()
  const searchParams = useSearchParams()
  const intent_id = searchParams.get("payment_intent")

const router = useRouter()
  useEffect(()=>{
    const makeRequest = async()=>{
      const res = await fetch(`http://localhost:3000/api/confirm/${intent_id}`,{
        method:"PUT"
      })
      if(res.status===200){
       router.push("/order")
       clearFromCart()
   
      }
    }
    makeRequest()
  },[intent_id])

  return (
    <div className='text-center justify-center items-center flex flex-col my-10 '>
             <h1 className="text-red-600 uppercase mb-5 font-semibold">thank you for shopping with us</h1>
             <span className="text-red-600">Please <b className='text-xl '>do not</b> close page while we process your order</span>
    </div>
  )
}

export default Success