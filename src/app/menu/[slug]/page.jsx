"use client"
import { Products } from '@/libs/data'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { FaHeart } from "react-icons/fa";
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const session = useSession()



  

    const{slug} =useParams()

    const  fetcher = async(urls)=>{
        const res = await fetch(urls)
        const data = await res.json()
       
        return data
      }

    const { data, error,mutate, isLoading } = useSWR(
        `http://localhost:3000/api/product?slug=${slug}`,
        fetcher
      );

  
const handleSave = async(id)=>{
  try {
    const res = await fetch( `http://localhost:3000/api/save`,{
      method:"POST",
      body:JSON.stringify({
        productId:id,
      })
    })
    const data = await res.json()
    toast.success(data.message)
   mutate()
  } catch (error) {
    console.log(error)
  }
}



  return ( 
    <div className='flex flex-wrap gap- '>
           {isLoading?
           <div class="flex flex-col h-[40vh] w-full sm:w-1/3 lg:w-1/4 relative border-r-[2px] border-red-500 border-b-2  items-center justify-center  md:last:border-l-2 group animate-pulse">
           <div class=" h-[150px] w-[150px] relative bg-gray-200 rounded-full">
           </div>
           <div class="flex justify-around items-center mt-3  w-full h-4 bg-gray-200 rounded"></div>
           <div class="flex justify-around items-center mt-3  w-full h-4 bg-gray-200 rounded"></div>
           <div class="group-hover:hidden text-red-500 font-semibold text-lg h-4 my-3 bg-gray-200 rounded"></div>
           <div class="bg-red-500 text-white text-base px-2 hidden py-1 rounded-md group-hover:flex h-8  "></div>
         </div>
           :
            data?.map(item=>(
                <div key={item.id} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full h-[29vh]  flex flex-col items-center justify-center border-r-2  border-b-2 border-red-500 group ">
                    <div className="flex-1 mt-8">

                    <div className="w-[100px] h-[100px] relative">
                            <Image src={"/p1.jpg"} fill alt='' className='rounded-full object-cover'/>
                           
                            <FaHeart onClick={()=>handleSave(item.id)}  className={`${ item?.likeId===item.id ?"fill-red-600":"fill-black/60"}  absolute -top-4 -right-20 `}/>
                    </div>
                    </div>
                    <div className="flex-1 flex justify-between items-center w-full text-red-500 p-1">
                         <span className='text-sm'>{item.title.slice(0,15)} </span>
                         <h1 className='group-hover:hidden font-semibold'>${item.price} </h1>
                         <Link href={`/singlepage/${item.id}`} className='text-white text-base  bg-red-600 p-1 rounded-sm hidden  group-hover:flex'>add to cart</Link>
                    </div>
                </div>
            ))
           }
    </div>
  )
}

export default page