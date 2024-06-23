"use client"
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const messageRef = useRef()
    const emailRef = useRef()
    const nameRef = useRef()

    const[loading,setLoading]= useState(false)
    const[error,setError]= useState('')
    const[success,setSuccess]= useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()

  const email = emailRef.current.value
  const name = nameRef.current.value
  const message = messageRef.current.value
 if(!email || !name || !message){
    return
 }

 setLoading(true)
 const templateform = {
    from_name:email,
    to_name:"marvin prince",
    message
 }
 emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, templateform, process.env.NEXT_PUBLIC_PUBLIC_ID).then(()=>(
    setLoading(false),
    setSuccess("your email as been sent successfully!"),
     emailRef.current.value='',
   nameRef.current.value='',
 messageRef.current.value=''  
 )).catch(error=>console.log(error))
    }

  return (
    <div className='my-16'>
        <h1 className="text-2xl text-black font-semibold mx-auto text-center mb-8">Contact me</h1>
        <div className="flex flex-col gap-8">
            <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-5 justify-center">
                <div className="flex flex-col md:w-1/3">
                    <label className='capitalize text-gray-700 mb-2' >name</label>
                    <input  ref={nameRef} type='text' name='name' placeholder='what should i can you?' required minLength={4} className='border outline-none py-2 px-1 placeholder:capitalize'/>
                </div>
                <div className="flex flex-col md:w-1/3">
                    <label className='capitalize text-gray-700 mb-2' >email</label>
                    <input ref={emailRef} type='email' name='email' placeholder='where can i reach you?' required minLength={4} className='border outline-none py-2 px-1 placeholder:capitalize'/>
                </div>
                </div>
                <div className="flex flex-col w-full  md:w-[68%] justify-center mx-auto mt-2">
                <label className='capitalize text-gray-700 mb-2' >message</label>
                <textarea ref={messageRef} name="message" id="" className='px-2 py-1 outline-none border resize-none w-full ' cols={8} rows={6}/>
                </div>
                {
                    success !== '' && <p className="text-green-600 flex text-center mx-auto py-2">{success} </p>
                }
                <button disabled={loading===true} type='submit' className={` ${loading===true && "cursor-not-allowed"} capitalize bg-black text-white tracking-wider rounded-md w-fit mx-auto px-5 py-2  hover:bg-black/70` }>send!</button>
            </form>
            <div className="shadow-sm ring ring-gray-50 py-3 flex flex-col items-center w-full md:w-[68%] mx-auto">
                <p className="text-gray-700 font-light">Or you can send a direct email!!</p>
            <a href="mailto:marvinprince232@gmail.com" className='text-black font-semibold underline'>marvinprince232@gmail.com</a>
            </div>
        </div>
    </div>
  )
}

export default Contact