"use client";
import { useCartStore } from "@/libs/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Cart = () => {
  const { products, removeFromCart, totalPrice,totalItems} = useCartStore();
  const {data,status}=useSession()
  const router = useRouter()
  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])

const handleCheckOut = async ()=>{
try {
  const res = await fetch("http://localhost:3000/api/order",{
    method:"POST",
    headers:{
      "Content-Type":"Application/Json"
    },
    body:JSON.stringify({
      price:totalPrice,
      products,
      userEmail:data?.user?.email,
      status:"NOT PAID!"
    })
  })
  const dat = await res.json()
 
  router.push(`/payment/${dat.id}`)
} catch (error) {
  console.log(error)
}  
  }
  
  return (
    <div className="min-h-[55vh] flex justify-center items-center w-[100%] mx-auto">

      <div className="flex flex-col md:flex-row w-full">

        <div className="flex-1 flex-col w-full p-1 items-center justify-center gap-4   flex  ">
          {products?.map((item) => (
            <div key={item.id} className="  w-full  items-center gap-6  md:justify-center flex  ">
              <div className="relative  w-[80px] h-[80px] rounded-full  ">
                <Image
                  src={item.img}
                  fill
                  alt=""
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col items-baseline relative">
                <h3 className="text-red-600 font-bold text-xl">
                  {item.title}{" "}
                </h3>
                <span className="text-sm font-light text-red-600 absolute -bottom-3">
                  {item?.optionTitle}{" "}
                </span>
              </div>
              <span className="font-semibold text-red-600">${item.price} </span>
              <span
                className="font-semibold text-red-600 cursor-pointer"
                onClick={() => removeFromCart(item)}
              >
                X
              </span>
            </div>
          ))}
        </div>


        <div className="flex-1 w-full bg-red-100/60 p-5 flex flex-col  min-h-screen items-center justify-center">
          <div className="w-[70%]  ">
            <div className="text-red-500 flex justify-between w-full items-center mb-3">
              <h1 className="capitalize text-xl font-bold " >
                Subtotal ({totalItems}){" "}
              </h1>
              <span className="font-semibold">${totalPrice} </span>
            </div>
            <div className="text-red-500 flex justify-between items-center w-full mb-3">
              <h1 className="capitalize text-xl font-bold text-left self-start">
                Service Cost{" "}
              </h1>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="text-red-500 flex justify-between w-full items-center mb-3">
              <h1 className="capitalize text-xl font-bold">Delivery Cost </h1>
              <span className="font-semibold text-green-600">FREE!</span>
            </div>
            <div className="text-red-500 flex justify-between w-full mt-5 ">
              <h1 className="capitalize text-xl font-bold">
                Total (INCL. VAT){" "}
              </h1>
              <span className="font-bold">${totalPrice} </span>
            </div>

            <button onClick={handleCheckOut} disabled={totalPrice===0||status==="unauthenticated"} className="bg-red-600 disabled:cursor-not-allowed disabled:bg-red-600/45 py-3 px-2 rounded-md  text-white uppercase flex items-center justify-center  mt-5 mx-auto min-w-[40%] ">
              checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
