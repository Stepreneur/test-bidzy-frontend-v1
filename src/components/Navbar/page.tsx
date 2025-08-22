"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { BellIcon, MenuIcon } from '../icons'

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='w-[327px] sm:w-[608px] lg:w-[100vw] sm:h-[104px] lg:h-[68px] h-[60px] sticky top-0 left-0 flex flex-row items-center justify-between py-[16px] px-0 lg:px-[25px]  bg-white z-50'>
        <Image src = '/bidzy/bidzy-lg.png' width={86.33} height={28} className='sm:w-[111px] sm:h-[36px]' alt='bidzy logo'/> 
        <div className='flex gap-6 text-center'>
          <a href='/feed' className='hidden lg:flex items-center text-[16px] text-[#27265C] hover:text-[#9399FF] transition-colors'>ประวัติการประมูล</a>
          <a href='/create' className='hidden lg:flex items-center text-[16px] text-[#27265C] hover:text-[#9399FF] transition-colors'>สร้างงานประมูล</a>
          <span className='hidden'><BellIcon/></span>
          
          {/* Mobile Menu Button */}
          <div className='lg:hidden relative'>
            <button 
              onClick={toggleMenu}
              className='flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <MenuIcon />
            </button>
            
            {/* Clean White Dropdown */}
            {isMenuOpen && (
              <div className='absolute right-0 top-12 w-56 bg-white rounded-[16px] shadow-xl border border-gray-100 py-3 z-50'>
                {/* Menu Items */}
                <div className='px-3'>
                  <a 
                    href='/feed' 
                    className='flex items-center w-full px-4 py-3 text-[16px] text-[#27265C] hover:bg-gray-50 rounded-[12px] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>ประวัติการประมูล</span>
                  </a>
                  
                  <a 
                    href='/create' 
                    className='flex items-center w-full px-4 py-3 text-[16px] text-[#27265C] hover:bg-gray-50 rounded-[12px] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >                    <span>สร้างงานประมูล</span>
                  </a>
                </div>
                
                {/* Divider */}
                <div className='border-t border-gray-100 my-2 mx-3'></div>
                
                {/* Auth Section */}
                <div className='px-3'>
                  <button 
                    className='flex items-center w-full px-4 py-3 text-[16px] text-[#E9635E] hover:bg-red-50 rounded-[12px] transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className='hidden lg:flex items-center justify-center w-[85px] py-[12px] rounded-[20px] h-[44px] font-semibold text-[16px] border-1 border-[#B1B1B1] text-red-400 hover:bg-red-50 transition-colors'>Log out</button>
        </div>
        

    </div>
  )
}

export default page