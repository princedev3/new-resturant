"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useCartStore } from "@/libs/store";
import toast from "react-hot-toast";



const sliderElement= [
    {
        id:1,
        price:12,
        img:"/p1.jpg",
        title:"New York Style Pizza",
        quotes:"satisfy your taste So, grab your smartphone, prepare your appetite, and embark on a captivating journey through these food quotes and captions that are sure to tantalize not only your followers' taste buds but also their imagination. Get ready to unlock a world of culinary inspiration as we explore the power of words and the beauty "
    },
    {
        id:2,
        price:15,
        img:"/p2.jpg",
        title:"Margherita Pizza",
        quotes:"a festival of flavors So, grab your smartphone, prepare your appetite, and embark on a captivating journey through these food quotes and captions that are sure to tantalize not only your followers' taste buds but also their imagination. Get ready to unlock a world of culinary inspiration as we explore the power of words and the beauty of food in this vibrant social media landscape. Let's dive in and uncover the perfect phrases that will make your Instagram feed a feast for the eyes and a delight for the soul"
    },
    {
        id:3,
        price:9,
        img:"/p3.jpg",
        title:"Sicilian Pizza",
        quotes:"enjoy a taste of heaven Food is more than just sustenance; it is a language that speaks to our senses and brings people together. Whether you're a food enthusiast, a passionate chef, or simply someone who appreciates the art of cuisine, sharing your culinary adventures on Instagram has become a delightful ritual. However, finding the perfect words to accompany your mouthwatering food photos can sometimes be a challenging task. Fear not, for we have curated a collection of delectable food quotes and captions that will elevate your Instagram"
    },
    {
        id:4,
        price:14,
        img:"/p4.jpg",
        title:"Greek Pizza",
        quotes:"Hundreds of flavors under one roof Restaurants are not just places to eat, they are also places to socialize, celebrate, and create memories. From fine dining establishments to hole-in-the-wall eateries, restaurants have captured the hearts and minds of people for generations. Here are 20 quotes that celebrate the magic of restaurants."
    },
    {
        id:5,
    price:20,
        img:"/p4.jpg",
        title:"Greek Pizza",
        quotes:"Hundreds of flavors under one roof Restaurants are not just places to eat, they are also places to socialize, celebrate, and create memories. From fine dining establishments to hole-in-the-wall eateries, restaurants have captured the hearts and minds of people for generations. Here are 20 quotes that celebrate the magic of restaurants."
    },
    {
        id:6,
        price:19,
        img:"/p4.jpg",
        title:"Greek Pizza",
        quotes:"Hundreds of flavors under one roof Restaurants are not just places to eat, they are also places to socialize, celebrate, and create memories. From fine dining establishments to hole-in-the-wall eateries, restaurants have captured the hearts and minds of people for generations. Here are 20 quotes that celebrate the magic of restaurants."
    },
    {
        id:7,
        price:17,
        img:"/p4.jpg",
        title:"Greek Pizza",
        quotes:"Hundreds of flavors under one roof Restaurants are not just places to eat, they are also places to socialize, celebrate, and create memories. From fine dining establishments to hole-in-the-wall eateries, restaurants have captured the hearts and minds of people for generations. Here are 20 quotes that celebrate the magic of restaurants."
    },
]

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
   
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
  
    }
  };
const IsFeatured = () => {
  
const {addToCart}= useCartStore()

    const  fetcher = async(urls)=>{
        const res = await fetch(urls)
        const data = await res.json()
    
        return data
      }

    const { data, error, isLoading } = useSWR(
        `http://localhost:3000/api/product`,
        fetcher
      );

    
      useEffect(()=>{
        useCartStore.persist.rehydrate()
      },[])

  return (
    <Carousel responsive={responsive}  removeArrowOnDeviceType={[ "mobile"]}   autoPlay={true} autoPlaySpeed={4000}  infinite={true}  itemClass="carousel-item-padding-40-px"  className="mt-[20vh] md:mt-[15vh] ">
        {isLoading? 
        <div class="h-[55vh] w-full md:w-[43vw] lg:w-[30vw] flex rounded-md flex-col items-center justify-center animate-pulse">
        <div class="relative w-[180px] h-[180px] bg-gray-200 rounded-full"></div>
        <div class="flex items-center flex-col justify-center gap-1">
          <div class="h-4 w-24 mt-2 bg-gray-200 rounded"></div>
          <div class="h-4 w-16 bg-gray-200 rounded"></div>
          <div class="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>:
data?.map((item)=>(
    <div className="h-[55vh]  w-full md:w-[43vw] lg:w-[30vw] hover:bg-fuchsia-100 flex rounded-md  flex-col items-center justify-center" key={item.id}>
        <div className="relative w-[180px] h-[180px]  ">
            <Image src={item.img } alt="" fill className="object-cover rounded-full"/>
        </div>
        <div className="flex items-center flex-col justify-center gap-1">
        <p className="text-red-600 font-semibold text-xl mt-2">{item.title} </p>
        <span className="text-red-600 font-semibold text-lg">${item.price} </span>
     
        <button onClick={()=>{
          addToCart({
            id:item.id,
            title:item.title,
            img:item.img,
            price:item.price,
            quantity:1,
           optionTitle:"small"
          }),
          toast.success("added to cart")
        }} href={"/"} className="bg-red-600 text-white font-medium capitalize rounded-md p-2">add to cart</button>
        </div>
    </div>
))
        }
    </Carousel>
  )
}

export default IsFeatured