"use client"
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CreateProduct = () => {
    const session = useSession()
    const router = useRouter()
    const[titleDesc,setTitleDesc]=useState({
        desc:"",
        title:''
    })
    const handleDescChange = (e)=>{
        setTitleDesc(prev=>({...prev,[e.target.name]:e.target.value}))
    }
   
const[slug,setSlug]=useState("pizzas")

const[isFeatured,setIsFeatured]=useState(false)
const[img,setImg]=useState("")
const[price,setPrice]= useState(1)

const handleFeatured = (e)=>{
    
if(e.target.checked){
    setIsFeatured(true)
}else{
    setIsFeatured(false)
}
}
const[options,setOption]=useState([])
const[additionalPrice,setAdditionalPrice]= useState(1)
const[title,setTitle]=useState("small")

const handleUpload = (result)=>{
    const info = result?.info
    if("secure_url" in info){
        setImg(info.secure_url)
    }
} 


const handleSumitProduct =async (e)=>{
    
    e.preventDefault()
    if(!img){
        alert("please add img")
        return
    }
    try {
        const res = await fetch(`http://localhost:3000/api/create-product`,{
            method:"POST",
            body:JSON.stringify({
                ...titleDesc,img,slug,options,isFeatured,price:parseInt(price)
            })
        })
        if(res.ok){
            const data = await res.json()
            toast.success(data.message)
            router.push(`/menu/${slug}`)
        }
    } catch (error) {
        console.log(error)
    }

}
  return (

    <form onSubmit={handleSumitProduct} className="container mx-auto p-4 space-y-4 flex flex-col items-center justify-center ">
  <div className="space-y-4 w-full">
    <div className="flex flex-col">
      <label htmlFor="title" className="text-gray-700 font-medium mb-2">Title of product</label>
      <input type="text" onChange={handleDescChange} name="title" id="title" required className="border border-gray-300 rounded p-2 outline-none focus:ring focus:ring-blue-300" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="price" className="text-gray-700 font-medium mb-2">Price of product</label>
      <input onChange={e=>setPrice(e.target.value)} type="number" min={1} max={20} name="price" required id="price" className="border border-gray-300 rounded p-2 outline-none focus:ring focus:ring-blue-300" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="desc" className="text-gray-700 font-medium mb-2">Description of product</label>
      <input type="text" onChange={handleDescChange} required name="desc" id="desc" className="border border-gray-300 rounded p-2 outline-none focus:ring focus:ring-blue-300" />
    </div>

    <div className="flex items-center space-x-2">
      <label htmlFor="isFeatured" className="text-gray-700 font-medium">Is Featured product:</label>
      <input type="checkbox" name="isFeatured" id="isFeatured" value={isFeatured} checked={isFeatured === true} onClick={handleFeatured} className="border border-gray-300 rounded outline-none focus:ring focus:ring-blue-300 w-5 h-5" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="upload" className="text-gray-700 font-medium mb-2">Upload image</label>
      {
        img && <Image src={img} width={100} height={50} className='object-cover rounded- md'/>
      }
      <CldUploadButton className='bg-blue-400 text-white rounded-md w-fit mx-auto py-2 px-3' uploadPreset={process.env.NEXT_PUBLIC_cloudinary_uploadPreset} options={{ sources: ["local", "unsplash"], multiple: true }} onUpload={handleUpload} />
    </div>

    <div className="flex flex-col">
      <label htmlFor="category" className="text-gray-700 font-medium mb-2">Select category</label>
      <select name="category" id="category" required className="border border-gray-300 rounded p-2 outline-none focus:ring focus:ring-blue-300" onChange={e => setSlug(e.target.value)}>
        <option value="" disabled>select category</option>
        <option value="pizzas">Pizzas</option>
        <option value="burgers">Burgers</option>
        <option value="pastas">Pastas</option>
      </select>
    </div>

    <div className=" flex flex-col gap-2 bg-gray-300">
      <div className="flex flex-col ">
        <label htmlFor="additionalPrice" className="text-gray-700 font-medium mb-2">Additional Price:</label>
        <input type="number" required min={1} max={20} name="additionalPrice" id="additionalPrice" onChange={e => setAdditionalPrice(e.target.value)} className="border border-blue-400 rounded p-2 outline-none focus:ring focus:ring-blue-300 bg-transparent " />
      </div>

      <div className="flex flex-col ">
        <label htmlFor="size" className="text-gray-700 font-medium mb-2">Size</label>
        <select name="size" id="size" required value={title} onChange={e => setTitle(e.target.value)} className="border border-blue-300 bg-transparent rounded p-2 outline-none focus:ring focus:ring-blue-300 w-[30%] mx-auto">
          <option value="" disabled>select options</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <span onClick={() => setOption(prev => [...prev, { "title": title, "additionalPrice": parseInt(additionalPrice) }])} className="border border-gray-300 rounded p-2 cursor-pointer hover:bg-gray-200 mt-10 w-fit items-center mx-auto ">
        Add
      </span>
    {options.map((item, index) => (
      <div key={index} className="flex justify-between p-2 border-b border-gray-200 w-fit mx-auto gap-4">
        <span className="text-gray-700">{item.title}</span>
        <span className="text-gray-700">${item.additionalPrice}</span>
      </div>
    ))}
    </div>

  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  ">Create Product</button>
</form>


  )
}





export default CreateProduct