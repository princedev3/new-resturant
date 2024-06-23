import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"


export const PUT = async(req,{params})=>{
    const {intent_id}= params
    try {
        const updated =await prisma.order.update({
            where:{
                intent_id
            },
            data:{
                status:"PAYMENT-RECIEVED/PROCESSING-ORDER"
            }
        })
        return new NextResponse(JSON.stringify({message:"order updated"}),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not update intent"}),{status:500})
    }
}