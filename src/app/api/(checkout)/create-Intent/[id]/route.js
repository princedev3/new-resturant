import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"


const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


export const POST = async(req,{params})=>{

    const {id}= params
   
    try {
        const findOrder = await prisma.order.findUnique({
            where:{
                id
            }
        })

        if(findOrder){
            const paymentIntent = await stripe.paymentIntents.create({
                amount: findOrder.price*100,
                currency: "eur",
                automatic_payment_methods: {
                  enabled: true,
                },
              });
              await prisma.order.update({
                where:{id},
                data: {
                    intent_id:paymentIntent.id
                    // status: 'PAID/PROCESSING!',
                  }
              })
              return new NextResponse(JSON.stringify({clientSecret:paymentIntent.client_secret}),{status:200})
        }else{
            return new NextResponse(JSON.stringify({message:"order not avaliable"}),{status:500})
        }
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not create intent"}),{status:500})
    }
}