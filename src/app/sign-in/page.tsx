"use client"
import React, { useState , useEffect } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, NoIcon } from '@/components/icons'
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import liff from '@line/liff';
import Cookies from 'js-cookie';

const Sign = () => {
  // for is sure then press next for user
  const [isSure , setIsSure] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [whichRole , setWhichRole] = useState<string | null>(null)
  // for change the flow page
  const [flowNum , setFlowNum] = useState(1)
  const [isLoading , setIsLoading] = useState(false)
  const [isLiffInitialized, setIsLiffInitialized] = useState(false)

  // for notify user that unsuccesfully login
  const [isFailed , setIsFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  //check if logged in
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;
    };

    setToken(getCookie("access_token"));
    console.log(token)
  }, []);

  useEffect(() => {
    if (token) {
      window.location.href = '/feed';
    }
  }, [token]);

  // Initialize LIFF only once
  useEffect(() => {    
    const initializeLiff = async () => {
      try {
        await liff.init({
          liffId: '2007827375-02296ylV',
        });
        setIsLiffInitialized(true);
        console.log('LIFF initialized successfully');
      } catch (err) {
        console.error('LIFF initialization failed:', err);
        setIsFailed(true);
        setErrorMessage('ไม่สามารถเชื่อมต่อกับ LINE ได้');
      }
    };

    initializeLiff();
  }, []);

  const handleLoginLiff = async () => {
    if (!isLiffInitialized) {
      setErrorMessage('กรุณารอสักครู่ กำลังเชื่อมต่อกับ LINE...');
      return;
    }

    if (!whichRole) {
      setErrorMessage('กรุณาเลือกประเภทผู้ใช้ก่อน');
      return;
    }

    try {
      setIsLoading(true);
      setIsFailed(false);
      setErrorMessage('');

      const idToken = liff.getIDToken();
      if (!idToken) {
        // If no ID token, redirect to LINE login
        await liff.login();
        return;
      }

      // Call API with role
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/line/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'token': idToken,
          "role": whichRole
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login success:', data);

      if (data.accessToken) {
        Cookies.set("access_token", data.accessToken, {
          expires: 365,
          secure: true,
          sameSite: "None",
          path: "/",
        });
        window.location.href = '/feed';
      } else {
        throw new Error('ไม่ได้รับ access token');
      }

    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      setIsFailed(true);
      setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  const handleFlowNum = () => {
    setFlowNum(2)
  }

  const handleNext = (role: string) => {
    // รีเซ็ตปุ่มก่อน (คืนสีเก่า)
    if(role == "bidder"){
      setWhichRole("BUYER")
      console.log('set role bidder')
    }else{
      setWhichRole("SELLER")
      console.log('set role seller')
    }
    if (selectedRole) {
      const prevBtn = document.getElementById(selectedRole) as HTMLElement | null
      if (prevBtn) {
        prevBtn.style.backgroundColor = 'white'
        prevBtn.style.color = '#27265C'
        prevBtn.style.border = '2px solid #9399FF'
      }
    }

    // เปลี่ยนสีปุ่มที่เลือก
    const whichRole = document.getElementById(role) as HTMLElement | null
    if (whichRole) {
      whichRole.style.backgroundColor = '#27265C'
      whichRole.style.borderColor = '#27265C'
      whichRole.style.color = '#fff'
    }

    setSelectedRole(role)
    setIsSure(true)
  }

  return (
    <div className='bg-white w-[100vw] h-[100vh] flex justify-center'>
      {isLoading == false ? (
        <div className='flex flex-col gap-[30px] mt-[65px] items-center'>
            <div className='text-[#27265C] font-bold text-[24px] text-center'>WELCOME TO</div>
            <Image src="/bidzy/bidzy-lg.png" width={197} height={64} alt='bidzy logo' className='object-contain' />
           
                {flowNum == 1 ? (
                <div className='flex flex-col justify-center gap-6'>
                  <div className='flex flex-col text-black text-center font-semibold text-[24px]'>คุณคือใคร</div>
                  <button id='bidder' onClick={() => handleNext("bidder")} className='block text-center border-2 border-[#9399FF] w-[231px] h-[64px] rounded-[12px] font-semibold text-[24px] text-[#27265C]'>นักประมูล</button>
                  <button id="seller" onClick={() => handleNext("seller")} className='block text-center border-2 border-[#9399FF] w-[231px] h-[64px] rounded-[12px] font-semibold text-[24px] text-[#27265C]'>ศิลปิน</button>
                  {isSure && (<button onClick={handleFlowNum} className="w-[231px] h-[36px] bg-[#eff4f9 ] rounded-[20px] flex" ><div className='flex font-semibold text-[16px] text-[#27265C] text-center  bg-[radial-gradient(circle,_#E6F2FF,_#B4D7FF)]   rounded-[20px] w-[231px] h-[31px] justify-center items-center gap-3'><span>Next</span><ChevronRightIcon width="16" height="16" /></div></button>)}
                </div>
                ) : flowNum == 2 ? (
                  <div className='flex flex-col justify-center gap-10 mt-5'>
                    <p className='text-[#9399FF] text-[16px] font-semibold text-center'>Connect with us</p>
                    <div className='flex flex-row gap-4 items-center rounded-[24px] justify-center w-[293px] h-[42px] border-1 border-[#82BCFF]'>
                      <Image src = '/brands/line-1.png' width={26} height={26} alt='line logo' className='object-contain' />
                      <button 
                        onClick={handleLoginLiff} 
                        disabled={!isLiffInitialized || !whichRole}
                        className={`text-[16px] font-semibold text-[#27265C] ${(!isLiffInitialized || !whichRole) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Continue with line
                      </button>
                      </div>
                 </div>
                ) : (null)}
                
        </div>
      ) : isLoading == true && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center relative">
      <div className="w-[100vw] h-[100vh] bg-[url('/Artwork.png')] bg-repeat bg-contain absolute"></div>
        <span className="text-[#27265C] font-semibold text-[32px] z-10">Loading...</span>
        </div>
      )}

        {/* for notify that failed sign in */}
        {isFailed && (
          <div className='animate-dropOnce fixed top-[30px] left-[50%] transform  -translate-x-1/2 flex flex-row items-center  justify-center gap-2 rounded-[8px] bg-[#E9635E] w-[187px] h-[48px]'>
            <Image src='/no.png' width={19.7} height={19.7} alt='no icon' /> 
            <div className='font-semibold text-[16px] text-white'>
              {errorMessage || 'คุณล็อคอินไม่สำเร็จ'}
            </div>
        </div>
          ) }
    </div>
  )
}

export default Sign