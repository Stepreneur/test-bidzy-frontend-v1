"use client"
import React from 'react'
import Image from 'next/image'
import { useState , useEffect } from 'react';

// Define the type for artwork
interface Artwork {
  id: number;
  image: string;
}

const blah =  [{
    id: 1,
    image: '/bidzy/characters/hammer-1.png'
  },
  {
    id: 2,
    image: '/bidzy/characters/hammer-2.png'
  },
]

console.log(blah)

const Artlist = () => {
  // number of artworks
  const [numArts , setNumArts] = useState(1)
  const [allArts , setAllArts] = useState<Artwork[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auction`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => res.json()).then(data => {
      setNumArts(data.length)
      setAllArts(data)
    })
  }, [])

  return (
    <div>
      <div className='flex justify-between sm:w-[608px] w-[343px] h-[68px] px-[12px]'>
        <span className='text-[16px] font-semibold text-[#27265C] font-family-kanit'>คลังผลงานของคุณ</span>
        <span className='text-[12px] text-[#27265C] font-normal font-family-kanit'>{numArts} งาน</span>
      </div>  
      <div>
        {numArts == 0 ? (
        <div className='flex flex-col items-center'>
          <div className='text-body-bold-lg sm:text-[32px] text-[#E770FF] '>คุณยังไม่มีงานประมูล</div>
          <div className='flex flex-col text-center text-[12px] sm:text-[16px] font-semibold text-[#27265C] mt-7 font-family-kanit'>
            <span>นำผลงานของคุณมาประมูล</span>
            <span>แล้วเรามาโชว์ความสร้างสรรค์</span>
            <span>ให้โลกเห็นกัน</span>
          </div>
          <Image src='/bidzy/characters/hammer-1.png' width={170} height={170} alt='hammer' className='sm:w-[340px] sm:h-[340px]' /> 
        </div>
        ): numArts > 0 && (
          <div>
            {blah?.map ((art: Artwork) => (
              <div className='w-full h-max' key={art.id}>
                  <a href={`/auction_page/${art.id}`}>
                    <Image src={art.image} width={100} height={100} alt='artwork' />
                  </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      
  )}
  export default Artlist