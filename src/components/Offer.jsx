"use client"
import Image from 'next/image'
import React from 'react'
import Countdown from 'react-countdown';

const Offer = () => {
  return (
    <div className='flex flex-col md:flex-row mt-10 bg-black rounded-md bg-[url("/offerBg.png")] h-[50vh] bg-cover'>
        <div className="flex-1 text-white flex items-center flex-col justify-around md:gap-4 md:justify-center ">
            <h2 className="text-lg font-semibold">Burgers: where simplicity meets deliciousness</h2>
            <p className="text-sm">Bite into happiness with a perfectly grilled burger</p>
            <Countdown date={ Date.now() + 100000000} className='text-yellow-500 font-setTimeout(() => {
                
            }, timeout);' />
        </div>
        <div className="flex-1 relative h-[50vh] w-full  hidden md:flex rounded-md ">
            <Image src={"/p1.jpg"} fill alt='' className='object-cover rounded-lg'/>
        </div>
    </div>
  )
}

export default Offer