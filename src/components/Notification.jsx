"use client"
import React from 'react'
import Marquee from "react-fast-marquee";

const Notification = () => {
  return (

    <div className='h-12 bg-red-500 text-center text-sm md:text-base cursor-pointer text-white px-4 flex items-center justify-center'>
    <Marquee speed={40} pauseOnHover >
      <p className='z-10'>
      A genuine fine-dining experience awaits
      </p>
  </Marquee>
  </div>
  )
}

export default Notification