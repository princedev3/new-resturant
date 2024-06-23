import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { getAuthsession } from "../auth/[...nextauth]/route"

export const POST = async(req,{params})=>{
    const body = await req.json()
    const authSession = await getAuthsession()
    
     if(authSession.user.isAdmin){
         try {
             const product = await prisma.product.create({
                 data:body
             })
             return new NextResponse(JSON.stringify({message:" created product successfully"}),{status:200})
         } catch (error) {
             console.log(error)
             return new NextResponse(JSON.stringify({message:"can not create product"}),{status:500})
         }
     }else{
        return new NextResponse(JSON.stringify({message:"can not create product"}),{status:500})
     }
}