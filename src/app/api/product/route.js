
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"



export const GET = async (req,{params})=>{
  
    const {searchParams} = new URL(req.url)
    const slug = searchParams.get("slug")
 
   
    try {
        const products = await prisma.product.findMany({
           where:{
            ...(slug?{slug}:{isFeatured:true})
           }
        })
        return new NextResponse(JSON.stringify(products),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not get product"}),{status:500})
    }
}


