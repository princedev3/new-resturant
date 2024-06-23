"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const sliderElement= [
    {
        id:1,
        img:"/p1.jpg",
        title:"New York Style Pizza",
        quotes:"satisfy your taste So, grab your smartphone, prepare your appetite, and embark on a captivating journey through these food quotes and captions that are sure to tantalize not only your followers' taste buds but also their imagination. Get ready to unlock a world of culinary inspiration as we explore the power of words and the beauty "
    },
    {
        id:2,
        img:"/p2.jpg",
        title:"Margherita Pizza",
        quotes:"a festival of flavors So, grab your smartphone, prepare your appetite, and embark on a captivating journey through these food quotes and captions that are sure to tantalize not only your followers' taste buds but also their imagination. Get ready to unlock a world of culinary inspiration as we explore the power of words and the beauty of food in this vibrant social media landscape. Let's dive in and uncover the perfect phrases that will make your Instagram feed a feast for the eyes and a delight for the soul"
    },
    {
        id:3,
        img:"/p3.jpg",
        title:"Sicilian Pizza",
        quotes:"enjoy a taste of heaven Food is more than just sustenance; it is a language that speaks to our senses and brings people together. Whether you're a food enthusiast, a passionate chef, or simply someone who appreciates the art of cuisine, sharing your culinary adventures on Instagram has become a delightful ritual. However, finding the perfect words to accompany your mouthwatering food photos can sometimes be a challenging task. Fear not, for we have curated a collection of delectable food quotes and captions that will elevate your Instagram"
    },
    {
        id:4,
        img:"/p4.jpg",
        title:"Greek Pizza",
        quotes:"Hundreds of flavors under one roof Restaurants are not just places to eat, they are also places to socialize, celebrate, and create memories. From fine dining establishments to hole-in-the-wall eateries, restaurants have captured the hearts and minds of people for generations. Here are 20 quotes that celebrate the magic of restaurants."
    },
]


const Slider = () => {
    const[idx,setIdx]=useState(0)
    
    useEffect(()=>{
   const interval =  setInterval(()=>setIdx((prev)=>prev ===sliderElement.length-1?0:prev+1),5000)
   return () => clearInterval(interval);
    },[])
  return (
    <div className='flex h-[75vh] md:h-[60vh] md:flex-row w-full flex-col '>
        
        <div className=" flex-1 flex relative min-h-[30vh] md:h-[50vh] w-full rounded-md">
            
         <Image src={sliderElement[idx].img} alt='' className='object-cover rounded-md' fill/>
        </div>

        <div className=" flex-1 flex flex-col  shadow-sm rounded-md p-3">
             <h1 className="text-lg font-semibold  text-center w-fit mx-auto mb-2 text-gray-700
">{sliderElement[idx].title}</h1>
 <div class="line-container">
    <div class="line"></div>
  </div>

  {/* <Box sx={{ width: '100%' ,color:"red"}}>

      <LinearProgress className='hidden md:flex '  color="inherit"  />
  </Box> */}
   
             <p className="text-base text-gray-500 
">{sliderElement[idx].quotes}</p>
        </div>

      

    </div>
  )
}      

export default Slider