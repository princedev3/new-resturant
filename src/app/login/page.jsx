"use client"
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {
    const {data, status}=useSession()
    const router = useRouter()
    if(status ==="authenticated"){
        router.push("/")
    }
  return (
    <div className='min-h-[45vh]  flex items-center justify-center  '>
        <div className="flex flex-col gap-10 shadow-md items-center  w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-10">
            <button className='flex items-center justify-center gap-1 py-4 px-2 bg-red-600/60 text-white w-[80%] text-center rounded-md cursor-not-allowed'>
                <div className="">
                    <Image src={"/git.jpg"} width={30} height={30} className='object-cover rounded-full'/>
                </div>
                <p className="">Login with github account</p>
            </button>
            <button onClick={()=>signIn("google") } className='flex items-center justify-center gap-1 py-4 px-2 bg-teal-700 text-white w-[80%] text-center rounded-md cursor-pointer'>
                <div className="">
                    <Image src={"/google.png"} width={30} height={30} className='object-cover'/>
                </div>
                <p className="font-semibold">Login with google account</p>
            </button>
            <button className='flex items-center justify-center gap-1 py-4 px-2 bg-green-600 text-white w-[80%] text-center rounded-md cursor-not-allowed'>
                <div className="">
                    <Image src={"/facebook.png"} width={30} height={30} className='object-cover'/>
                </div>
                <p className="">Login with facebook account</p>
            </button>
           
        </div>
    </div>
  )
}

export default Login