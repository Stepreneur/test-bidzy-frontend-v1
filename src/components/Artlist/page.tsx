"use client"
import React from 'react'
import Image from 'next/image'
import { useState , useEffect } from 'react';

// Define the type for artwork based on the schema
interface Artwork {
  id: number;
  title: string;
  image: string;
  description: string;
  size: string;
  material: string;
  method: string;
  style: string;
  transportPrice: number;
  phone: string;
  fbName: string;
  fbLink: string;
  websiteLink: string;
  startingPrice: number;
  buyNowPrice: number;
  minimumBidIncrement: number;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    lineId: string;
    name: string;
    image: string;
    role: string;
    auctions: string[];
    bids: Array<{
      id: number;
      amount: number;
      placedAt: string;
      auction: string;
      user: string;
    }>;
  };
  bids: Array<{
    id: number;
    amount: number;
    placedAt: string;
    auction: string;
    user: string;
  }>;
}

const Artlist = () => {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;
    };

    setToken(getCookie("access_token"));
  }, []);
  // number of artworks
  const [numArts, setNumArts] = useState(0)
  const [allArts, setAllArts] = useState<Artwork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get token from localStorage
        
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auction/by-user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch auctions')
        }

        const data: Artwork[] = await response.json()
        
        // Sort by createdAt date (newest first)
        const sortedData = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        
        setNumArts(sortedData.length)
        setAllArts(sortedData)
      } catch (err) {
        console.error('Error fetching auctions:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch auctions')
        setNumArts(0)
        setAllArts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuctions()
  }, [token])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9399FF]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="font-semibold">เกิดข้อผิดพลาด</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-between sm:w-[608px] w-[343px] h-[68px] px-[12px]'>
        <span className='text-[16px] font-semibold text-[#27265C] font-family-kanit'>คลังผลงานของคุณ</span>
        <span className='text-[12px] text-[#27265C] font-normal font-family-kanit'>{numArts} งาน</span>
      </div>  
      <div>
        {numArts === 0 ? (
        <div className='flex flex-col items-center'>
          <div className='text-body-bold-lg sm:text-[32px] text-[#E770FF] '>คุณยังไม่มีงานประมูล</div>
          <div className='flex flex-col text-center text-[12px] sm:text-[16px] font-semibold text-[#27265C] mt-7 font-family-kanit'>
            <span>นำผลงานของคุณมาประมูล</span>
            <span>แล้วเรามาโชว์ความสร้างสรรค์</span>
            <span>ให้โลกเห็นกัน</span>
          </div>
          <Image src='/bidzy/characters/hammer-1.png' width={170} height={170} alt='hammer' className='sm:w-[340px] sm:h-[340px]' /> 
        </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {allArts.map((art: Artwork) => (
              <div className='w-full aspect-square' key={art.id}>
                <a href={`/auction_page/${art.id}`} className="block w-full h-full">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <Image 
                      src={art.image} 
                      alt={art.title || 'Artwork'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Artlist