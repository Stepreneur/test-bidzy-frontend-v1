"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar/page'
import { ShareIcon } from '@/components/icons'
import { ChevronLeftIcon } from '@/components/icons'

// Mock data for auction
const mockAuctionData = {
  id: 1,
  artworkName: "Abstract Harmony",
  description: "งานศิลปะที่แสดงถึงความสมดุลของสีและรูปทรง\nสร้างจากแรงบันดาลใจจากธรรมชาติ\nและประสบการณ์ส่วนตัวของศิลปิน",
  size: "60 x 80 cm",
  technique: "Acrylic on Canvas",
  style: "Abstract",
  shipping: "150",
  phone: "0812345678",
  facebookName: "Art Mosphere Studio",
  facebookLink: "https://facebook.com/artmosphere",
  website: "https://artmosphere.com",
  startPrice: "2500",
  minBid: "100",
  sellPrice: "5000",
  endTime: "25/12/2024 23:59",
  creator: "Art Mosphere",
  creatorImage: "/bidzy/characters/hammer-1.png",
  images: [
    "/Artwork.png",
  ]
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [auctionData, setAuctionData] = useState(mockAuctionData)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Unwrap params using React.use()
  const resolvedParams = React.use(params)
  const { id } = resolvedParams

  // Simulate fetching data based on ID
  useEffect(() => {
    // In real app, you would fetch data from API using id
    console.log('Fetching auction data for ID:', id)
    // For now, we'll use mock data
    setAuctionData(mockAuctionData)
  }, [id])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar />
      <div className='w-[327px] sm:w-[608px]'>
      <div className='h-[56px] flex justify-between items-center relative mb-[30px]'>
             <ChevronLeftIcon
         onClick={() => {window.location.href='feed'}}
       />
            <div className='flex flex-col'>
              <span className='font-semibold text-[24px] text-[#27265C]'>สร้างงานประมูล</span>
            </div>
          <ShareIcon />
      </div>
      <div className="max-w-4xl mx-auto p-4">

        {/* Creator Info */}
        <CreatorInfo creatorImage={auctionData.creatorImage} creator={auctionData.creator} responsive={'tablet'} />

        {/* Image Gallery */}
        <div className="w-full mb-6">
          <div className={`flex gap-3 pb-2 ${auctionData.images.length === 1 ? 'justify-center' : 'overflow-x-auto scrollbar-hide'}`}>
            {auctionData.images.map((image, index) => (
              <div key={index} className="relative flex-shrink-0">
                <div className="relative w-[327px] h-[327px] sm:w-[456px] sm:h-[456px] rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creator Info */}
        <CreatorInfo creatorImage={auctionData.creatorImage} creator={auctionData.creator} responsive={'mobile,desktop'} />


        {/* Auction Details */}
        <div className='text-[#27265C] text-[16px] flex flex-col gap-3'>
          <span className='font-semibold text-[20px]'>รายละเอียดผลงาน</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ชื่อผลงาน :</div>
            <span>{auctionData.artworkName}</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>คำอธิบาย :</div>
            <span style={{whiteSpace: 'pre-wrap'}}>{auctionData.description}</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ขนาด :</div>
            <span>{auctionData.size}</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วิธีสร้างงาน :</div>
            <span>{auctionData.technique}</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>สไตล์งาน :</div>
            <div className="bg-[#E8F5E8] rounded-full px-3 py-1">
              <span className="text-[#27265C] text-sm">{auctionData.style}</span>
            </div>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ค่าส่ง :</div>
            <span>{auctionData.shipping} บาท</span>
          </div>

          <span className='font-semibold text-[20px] mt-4'>ช่องทางศิลปิน</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>เบอร์โทรศัพท์ :</div>
            <span>{auctionData.phone}</span>
          </div>
          
          {auctionData.facebookName && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Facebook :</div>
              <span>{auctionData.facebookName}</span>
            </div>
          )}
          
          {auctionData.facebookLink && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ลิงค์ Facebook :</div>
              <a href={auctionData.facebookLink} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">
                {auctionData.facebookLink}
              </a>
            </div>
          )}
          
          {auctionData.website && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Website :</div>
              <a href={auctionData.website} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">
                {auctionData.website}
              </a>
            </div>
          )}

          <span className='font-semibold text-[20px] mt-4'>รายละเอียดราคาประมูล</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาเริ่มต้น :</div>
            <span>{auctionData.startPrice} บาท</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ประมูลเพิ่มขั้นต่ำ :</div>
            <span>{auctionData.minBid} บาท</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาขาย :</div>
            <span>{auctionData.sellPrice} บาท</span>
          </div>
          
          <div className='flex flex-row mb-[80px]'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วันปิดประมูล :</div>
            <span>{auctionData.endTime}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}



const CreatorInfo = ({creatorImage, creator, responsive}: {creatorImage: string, creator: string, responsive: string}) => {
  return (
    <div className={`flex flex-row gap-4 mb-6 ${responsive == 'mobile,desktop' ? ('flex sm:hidden lg:flex') : responsive == 'tablet' && ('hidden sm:flex lg:hidden')}`}>
          <Image src={creatorImage} width={48} height={48} alt='Creator' className="rounded-full lg:w-[72px] lg:h-[72px]" />
          <div className='flex flex-col'>
            <span className='text-[14px] text-[#858585] sm:text-[21px]'>ชื่อศิลปิน</span>
            <span className='text-[#9399FF] font-semibold text-[20px] sm:text-[30px]'>{creator}</span>
          </div>
    </div>
  )
}


export default Page