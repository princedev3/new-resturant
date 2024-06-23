import { NextResponse } from "next/server"
import { getAuthsession } from "../auth/[...nextauth]/route"
import prisma from "@/libs/prismadb"


export const POST = async(req,{params})=>{
    const authSession = await getAuthsession()

    if(authSession){
        const body = await req.json()
        try {
            const order = await prisma.order.create({
                data:body
            })
            
            return new NextResponse(JSON.stringify(order),{status:200})
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({message:"can not create order"}),{status:500})
        }
    }else{
      
        return new NextResponse(JSON.stringify({message:"something went wrong"}),{status:500})

    }
}


export const GET = async ()=>{
    const authSession = await getAuthsession()
    
    try {
       if(authSession?.user?.isAdmin){
        const order = await prisma.order.findMany()
        return new NextResponse(JSON.stringify(order),{status:200})
       }else{
        const order = await prisma.order.findMany({
            where:{
                userEmail:authSession?.user?.email
            }
        })
console.log(order)
        return new NextResponse(JSON.stringify(order),{status:200})
       }
       
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not fetch order"}),{status:500})
    }
}