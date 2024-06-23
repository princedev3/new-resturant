import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"



export const GET = async()=>{
    try {
        const menu = await prisma.menu.findMany()
        return new NextResponse(JSON.stringify(menu),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"you can not fetch menu"}),{status:500})
    }
}