"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar/page'
import { ShareIcon } from '@/components/icons'
import { ChevronLeftIcon } from '@/components/icons'



// Define the type for auction data based on the schema
interface AuctionData {
  id: number;
  title: string;
  image: string;
  images?: string[]; // Optional array of images for gallery
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

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)

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

  // Unwrap params using React.use()
  const resolvedParams = React.use(params)
  const { id } = resolvedParams

  //for sharing
  const [link, setLink] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch auction data based on ID
  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        

        

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auction/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch auction data')
        }

        const data: AuctionData = await response.json()
        setAuctionData(data)
        
        // Check if user came from create page
        const fromCreate = new URLSearchParams(window.location.search).get('fromCreate')
        if (fromCreate === 'true') {
          setShowSuccessNotification(true)
          // Remove the parameter from URL
          window.history.replaceState({}, document.title, window.location.pathname)
          // Auto-hide notification after 3 seconds
          setTimeout(() => {
            setShowSuccessNotification(false)
          }, 3000)
        }
      } catch (err) {
        console.error('Error fetching auction data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch auction data')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchAuctionData()
    }
  }, [id])

  //for sharing
  const share = (id: number) => {
    const link = `${window.location.origin}/auction_page/${id}`;
    setLink(link);
    navigator.clipboard.writeText(link);
    setModalOpen(true);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9399FF]"></div>
        <p className="mt-4 text-[#27265C] font-semibold">กำลังโหลดข้อมูล...</p>
      </div>
    )
  }

  if (error || !auctionData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="font-semibold text-lg">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-2">{error || 'ไม่พบข้อมูลการประมูล'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar />
      
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xs">✓</span>
            </div>
            <span className="font-semibold">โพสต์ประมูลสำเร็จ!</span>
          </div>
        </div>
      )}
      
      <div className='w-[327px] sm:w-[608px]'>
      <div className='h-[56px] flex justify-between items-center relative mb-[30px]'>
             <ChevronLeftIcon
         onClick={() => {window.location.href='feed'}}
       />
            <div className='flex flex-col'>
              <span className='font-semibold text-[24px] text-[#27265C]'>รายละเอียดการประมูล</span>
            </div>
          <ShareIcon  onClick={() => share(auctionData.id)} />
      </div>
      <div className="max-w-4xl mx-auto p-4">

        {/* Creator Info */}
        <CreatorInfo creatorImage={auctionData.user.image} creator={auctionData.user.name} responsive={'tablet'} />

                 {/* Image Gallery */}
         <ImageGallery images={auctionData.images || [auctionData.image]} title={auctionData.title} />

        {/* Creator Info */}
        <CreatorInfo creatorImage={auctionData.user.image} creator={auctionData.user.name} responsive={'mobile,desktop'} />

        {/* Auction Details */}
        <div className='text-[#27265C] text-[16px] flex flex-col gap-3'>
          <span className='font-semibold text-[20px]'>รายละเอียดผลงาน</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ชื่อผลงาน :</div>
            <span>{auctionData.title}</span>
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
            <span>{auctionData.method}</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>สไตล์งาน :</div>
            <div className="bg-[#E8F5E8] rounded-full px-3 py-1">
              <span className="text-[#27265C] text-sm">{auctionData.style}</span>
            </div>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ค่าส่ง :</div>
            <span>{auctionData.transportPrice} บาท</span>
          </div>

          <span className='font-semibold text-[20px] mt-4'>ช่องทางศิลปิน</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>เบอร์โทรศัพท์ :</div>
            <span>{auctionData.phone}</span>
          </div>
          
          {auctionData.fbName && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Facebook :</div>
              <span>{auctionData.fbName}</span>
            </div>
          )}
          
          {auctionData.fbLink && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ลิงค์ Facebook :</div>
              <a href={auctionData.fbLink} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">
                {auctionData.fbLink}
              </a>
            </div>
          )}
          
          {auctionData.websiteLink && (
            <div className='flex flex-row'>
              <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Website :</div>
              <a href={auctionData.websiteLink} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">
                {auctionData.websiteLink}
              </a>
            </div>
          )}

          <span className='font-semibold text-[20px] mt-4'>รายละเอียดราคาประมูล</span>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาเริ่มต้น :</div>
            <span>{auctionData.startingPrice} บาท</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ประมูลเพิ่มขั้นต่ำ :</div>
            <span>{auctionData.minimumBidIncrement} บาท</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาขาย :</div>
            <span>{auctionData.buyNowPrice} บาท</span>
          </div>
          
          <div className='flex flex-row'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วันเริ่มประมูล :</div>
            <span>{new Date(auctionData.startAt).toLocaleString('th-TH')}</span>
          </div>
          
          <div className='flex flex-row mb-[80px]'>
            <div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วันปิดประมูล :</div>
            <span>{new Date(auctionData.endAt).toLocaleString('th-TH')}</span>
          </div>
        </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] text-center relative flex flex-col gap-10">
            <button
              onClick={() => setModalOpen(false)}
              className="top-0 right-0 !text-black text-3xl px-4 py-2 rounded-lg absolute"
            >
              ×
            </button>
            <div className="w-[100px] h-full mx-auto ">
              <Image src="/icon/correct.png" width={1000} height={1000} alt="mascot" className="object-contain" /> 
            </div>
            <div className="font-bold text-md">การประมูลเริ่มแล้ว แชร์ลิงค์ไปหานักประมูลเลย</div>
            <div className="flex flex-row">
              <div className="text-sm text-gray-800 bg-gray-100 px-4 py-3 rounded-l-xl break-words w-full font-mono text-center flex items-center">
                {link}
              </div>
              <button
                onClick={() => share(auctionData.id)}
                className={`px-5 py-2 rounded-r-xl w-max  text-sm font-semibold transition-all shadow-md hover:scale-105 ${
                  copied ? "bg-green-500 !text-white" : "bg-blue-600 hover:bg-blue-700 !text-white"
                }`}
              >
                {copied ? "คัดลอกเรียบร้อย" : "คัดลอกลิงก์"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ImageGallery = ({ images, title }: { images: string[], title: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full mb-6">
      {/* Mobile: Horizontal scrollable gallery */}
      <div className="sm:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <div key={index} className="relative flex-shrink-0">
              <div className="relative w-[327px] h-[327px] rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={image}
                  alt={`${title} - รูปที่ ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Desktop: Main image + thumbnail gallery */}
      <div className="hidden sm:block">
        {/* Main large image */}
        <div className="mb-4">
          <div className="relative w-full h-[456px] rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={images[selectedImage]}
              alt={`${title} - รูปที่ ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative flex-shrink-0 transition-all ${
                  selectedImage === index 
                    ? 'ring-2 ring-[#9399FF] ring-offset-2' 
                    : 'hover:opacity-80'
                }`}
              >
                <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CreatorInfo = ({creatorImage, creator, responsive}: {creatorImage: string, creator: string, responsive: string}) => {
  return (
    <div className={`flex flex-row gap-4 mb-6 ${responsive === 'mobile,desktop' ? ('flex sm:hidden lg:flex') : responsive === 'tablet' ? ('hidden sm:flex lg:hidden') : ''}`}>
          <Image src={creatorImage} width={48} height={48} alt='Creator' className="rounded-full lg:w-[72px] lg:h-[72px]" />
          <div className='flex flex-col'>
            <span className='text-[14px] text-[#858585] sm:text-[21px]'>ชื่อศิลปิน</span>
            <span className='text-[#9399FF] font-semibold text-[20px] sm:text-[30px]'>{creator}</span>
          </div>
    </div>
  )
}

export default Page