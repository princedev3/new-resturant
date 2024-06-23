import { NextResponse } from "next/server"
import { getAuthsession } from "../auth/[...nextauth]/route"
import prisma from "@/libs/prismadb"

export const GET = async(req,{params})=>{
    try {
        const userSession = await  getAuthsession()
        const fetchUser = await prisma.user.findUnique({
            where:{
                email:userSession.user?.email
            }
        })
        const fetchLikes = await prisma.likes.findMany({
            where:{
             userId:fetchUser.id,
            },
            include:{
                product:true
            }
        })
        const likeArray =[]
        fetchLikes.map(item=>likeArray.push(item.product))
       
        return new NextResponse(JSON.stringify(likeArray),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not get likes"}),{status:500})
    }
}

export const POST = async(req,{params})=> {

   
    try { 
    const userSession = await  getAuthsession()
    const fetchUser = await prisma.user.findUnique({
        where:{
            email:userSession.user?.email
        }
    })
   

    const body = await req.json()
    const  existingLike = await prisma.likes.findUnique({
        where:{
            userId_productId:{
                userId:fetchUser.id,
                productId:body.productId
            }
        }
    })
if(existingLike){
    const deleteLikes = await prisma.likes.delete({
        where:{
            userId_productId:{
                userId:fetchUser.id,
                productId:body.productId
            },
           
        }
    })
   await prisma.product.update({
    where:{
        id:deleteLikes.productId
    },
    data:{
        likeId:null
    }
   })
    return new NextResponse(JSON.stringify({message:"unliked"}),{status:200})
}else{
    const  postLikes = await prisma.likes.create({
        data:{
            userId:fetchUser?.id,
            productId:body.productId
        },
        include:{
            product:true
        }
    })

    await prisma.product.update({
        where:{
            id:postLikes.productId
        },
        data:{
            likeId:postLikes.productId
        }
       })
    return new NextResponse(JSON.stringify({message:"liked"}),{status:200})
}
} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"can not  save post"}),{status:500})
}
}

