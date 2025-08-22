"use client"
import React, {  useState, useEffect , Suspense } from "react";
import Image from 'next/image'




const Navbar = React.lazy(() => import("@/components/Navbar/page"));
const Artworks = React.lazy(() => import("@/components/Artlist/page"));



export default function Feed() {
  return (
    <div className="bg-white w-[100vw] h-[100vh] flex flex-col items-center gap-10">
      <Suspense 
      fallback={
      <div className="w-[100vw] h-[100vh] flex justify-center items-center relative">
      <div className="w-[100vw] h-[100vh] bg-[url('/Artwork.png')] bg-repeat bg-contain absolute"></div>
        <span className="text-[#27265C] font-semibold text-[32px] z-10">Loading...</span>
        </div>
      }>
        <Navbar />
        <button onClick={() => window.location.href = '/create'} className=" block sm:w-[608px] w-[327px] h-[44px] bg-[#27265C] text-white  rounded-[20px] font-semibold text-[16px] ">สร้างงานประมูล</button>
        <Artworks />
      </Suspense>
    </div>
  );
}
