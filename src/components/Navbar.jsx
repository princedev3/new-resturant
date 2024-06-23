"use client"
import Link from 'next/link'
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { LiaProductHunt } from "react-icons/lia";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/libs/store';

const Navbar = () => {
  const {totalItems} =useCartStore()

  const {data,status} = useSession()
  
 
  const router = useRouter()
  if(status ==="unauthenticated"){
         router.push("/login")
  }
  return (
    <div className='h-[70px] border-b-2 border-red-600 flex items-center justify-between '>
        <div className="flex-1 flex items-center gap-7 md:gap-10  h-full mr-2  ">
            <Link href={"/"} className='text-lg ml-8 capitalize cursor-pointer text-gray-600  hover:text-red-600
bg-gradient-to-r from-red-500 to-red-500 bg-[length:0px_3px] hover:bg-[length:100%_3px]  bg-left-bottom bg-no-repeat transition-[background-size] duration-500
'>Home</Link>
            <Link href={"/menu"} className='text-lg cursor-pointer capitalize text-gray-600 
bg-gradient-to-r from-red-500 to-red-500 bg-[length:0px_3px] hover:bg-[length:100%_3px]  bg-left-bottom bg-no-repeat transition-[background-size] duration-500
 hover:text-red-600'>menu</Link>
            <Link href={"/likes"} className='text-lg cursor-pointer capitalize text-gray-600 
bg-gradient-to-r from-red-500 to-red-500 bg-[length:0px_3px] hover:bg-[length:100%_3px]  bg-left-bottom bg-no-repeat transition-[background-size] duration-500
 hover:text-red-600 '>likes</Link>
        </div>
        <div className="flex-1 flex justify-end mr-24 gap-5">

        <div className="flex gap-3 bg-fuchsia-100 p-1 ">
        <Link href={"/order"} className=" flex items-center gap-1 ">
               <LiaProductHunt  className=' text-3xl text-gray-700 cursor-pointer stroke-[0.001px] '/>

            </Link>
        <Link href={"/cart"} className="bg-fuchsia-100  flex items-center gap-1 ">
               <CiShoppingCart  className=' text-3xl text-gray-950 cursor-pointer'/>({totalItems})
               
            </Link>
        </div>
        <div className=" relative group flex items-center justify-end ">
            <span className="">
                <FaRegUser className=' text-xl text-gray-600 cursor-pointer'/>
            </span>
            <div className="min-h-[70px] z-50 rounded-md ring-2 ring-gray-100 min-w-[150px] right-4  shadow-md bg-white absolute -top-[150px] opacity-0 group-hover:top-8   group-hover:opacity-100 group-hover:duration-500 duration-500 flex flex-col gap-1 p-3">
             <Link href={"/login"} className='cursor-pointer capitalize text-gray-600'>login</Link>
              <span onClick={signOut} className="cursor-pointer text-gray-600">Logout</span>
               {
      data?.user?.isAdmin &&
               <Link href={"/create-product"} className='cursor-pointer capitalize text-gray-600'>create-product</Link>
               } 
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar