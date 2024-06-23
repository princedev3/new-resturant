"use client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const fetcher = async (urls) => {
  const res = await fetch(urls);
  const data = await res.json();
  return data;
};
const Menu = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/menu",
    fetcher
  );

  
  return (
    <div>
      <div className="bg-fuchsia-50 w-full min-h-screen bg-cover " style={{backgroundImage:`url(/p4.jpg)`}}>
        <h1 className=" btn-custom1" >menu</h1>
        {isLoading ? (
          <div className="w-full min-h-screen flex items-center justify-center ">
            <div class="animate-pulse bg-gray-200 shadow-md py-4 px-3 w-full md:w-[80%] lg:max-w-[45.33%] h-[40vh] rounded-md">
              <div class="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div class="h-6 bg-gray-300 rounded w-full mb-4"></div>
              <div class="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 items-center justify-center  p-7 w-full">
            {data &&
              data.map((item) => (
                <Link
                href={`/menu/${item.menuSlug}`}
                  className={` bg-cover shadow-lg  hover:border    py-4 px-3  w-full md:w-[80%] lg:max-w-[45.33%] h-[40vh] rounded-md hover:scale-105 duration-300 transition-all`}
                >
                  <h1 className="text-3xl font-extrabold mb-2 uppercase text-white   ">
                    {item.title}{" "}
                  </h1>
                  <p className="mb-4 text-white bg-black/50 w-fit">
                    {item.desc}
                  </p>
                  <div
                   
                    className="text-base text-white py-4 px-4 rounded-md bg-gradient-to-r from-black to-slate-500 cursor-pointer "
                  >
                    select your favorite pasta here
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;


// text-6xl font-bold text-white py-5 flex justify-center items-center before:absolute before:top-0 before:left-0 before:text-green-500 add-content before:border-r-2 before:w-full before:h-full before:btn-custom