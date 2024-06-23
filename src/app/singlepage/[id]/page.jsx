"use client"
import { useCartStore } from '@/libs/store'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'






  
  const singlePage = () => {

    const {addToCart, totalPrice,totalItems} =useCartStore()

    const{id} =useParams()

    
    const  fetcher = async(urls)=>{
      const res = await fetch(urls)
      const data = await res.json()

      return data
    }

  const { data, error, isLoading } = useSWR(
      `http://localhost:3000/api/product/${id}`,
      fetcher
    );

   
    const[selected,setSelected]= useState(0)
    const [price,setPrice] = useState(data?.price)
    const[quantity,setQuantity]=useState(1)
    
    useEffect(()=>{
      
      setPrice(quantity*(data?.options.length ? data?.options[selected].additionalPrice + data?.price: data?.price))
      
    },[quantity.id,price,quantity,selected,data])
    
    useEffect(()=>{
      useCartStore.persist.rehydrate()
    },[])

  return (
    <div className='min-h-[60vh]  flex items-center justify-center mt-6 md:mt-0  p-4 md:p-0'>
      {
        isLoading? 
        <div class="flex flex-col md:flex-row md:gap-6 items-center justify-center w-full gap-8 animate-pulse">
  <div class="relative flex-1 w-full flex justify-center md:justify-end rounded-full">
    <div class="w-64 h-64 relative bg-gray-200 rounded-full">
    </div>
  </div>
  <div class="flex-1 flex flex-col items-center md:items-start gap-2">
    <div class="h-6 bg-gray-200 rounded w-1/2"></div>
    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    <div class="h-6 bg-gray-200 rounded w-1/4"></div>
    <div class="flex gap-2 my-3">
      <div class="h-6 bg-gray-200 rounded w-24"></div>
      <div class="h-6 bg-gray-200 rounded w-24"></div>
      <div class="h-6 bg-gray-200 rounded w-24"></div>
    </div>
    <div class="w-3/4">
      <div class="border border-gray-400 flex justify-between">
        <div class="h-4 bg-gray-200 rounded w-32 p-2"></div>
        <div class="flex items-center gap-4 ">
          <div class="h-6 w-6 bg-gray-200 rounded"></div>
          <div class="h-4 w-4 bg-gray-200 rounded"></div>
          <div class="h-6 w-6 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  </div>
</div>
        :

        <div className="flex flex-col md:flex-row  md:gap-6 items-center justify-center w-full gap-8 ">
            <div className="relative flex-1 w-full  flex justify-center md:justify-end rounded-full">
                <div className="w-[250px] h-[250px] relative">
                <Image src={data.img} fill alt='' className='object-cover rounded-full'/>
                </div>
            </div>
            <div className=" flex-1 flex flex-col items-center md:items-start gap-2 ">
             <h1 className="text-4xl font-bold text-red-600">{data?.title} </h1>   
             <p className="text-red-500">{data?.desc} </p> 
             <b className="text-xl font-bold text-red-600">${price.toFixed(1)} </b>
             <div className="flex gap-2 my-3">
                {
                    data?.options.map((item,index)=>(
                        <button onClick={()=>setSelected(index)} className={`${index==selected? "bg-red-700 text-white ":"bg-white text-red-700"} min-w-[120px] border border-red-600  py-2 px-3 font-semibold rounded-md`} key={item.title}>{item.title} </button>
                    ))
                }
             </div>
             <div className="w-[80%] ">
                <div className="border border-red-400 flex justify-between ">
                <span className="text-red-700  p-2 capitalize text-lg">quantity</span>
                <div className="text-red-600 text-lg">
                <button className='mr-2' onClick={()=>setQuantity(prev=>prev>1?prev-1:1)}>{"<"} </button>
                <span className="">{quantity} </span>
                <button className='mx-2' onClick={()=>setQuantity(prev=>prev===10?prev:prev+1)} >{">"} </button>
                <button onClick={()=>addToCart({
                  id:data.id,
                  title:data.title,
                  img:data.img,
                  price,
                  quantity,
                  ...(data.options.length >0 && {optionTitle:data.options[selected].title} )
                })} className='bg-red-600 text-white text-lg p-2'>add to cart</button>
                </div>
                </div>
             </div>
             </div>
        </div>
      }
    </div>
  )
}  

export default singlePage