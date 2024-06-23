import React from 'react'

const Footer = () => {
  return (
    <div className='h-[80px]  '>
       

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
             
                <span className="text-red-700 self-center text-2xl font-semibold whitespace-nowrap dark:text-red-700">The Enterprize</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-red-700 dark:text-red-700">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto text-red-700 lg:my-8" />
        <span className="block text-sm  sm:text-center text-red-700">© 2023 <a href="#" className="hover:underline">Enterprize™</a>. All Rights Reserved.</span>
    </div>
</footer>


    </div>
  )
}

export default Footer