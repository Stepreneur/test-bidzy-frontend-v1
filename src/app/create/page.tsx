"use client"
import React from 'react'
import {useState , useEffect} from 'react'
import { useRef } from "react"; // เพิ่มเข้าไป 
import Navbar from '@/components/Navbar/page'
import { ChevronLeftIcon, CloudIcon, UploadIcon, ChevronDownIcon } from '@/components/icons'
import Image from 'next/image'


const page = () => {

  
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;
    };

    setToken(getCookie("accessToken"));
  }, []);
  // for next button 
  const [flowNum , setFlowNum] = useState(1)

  // for change color
  const [fontColor , setFontColor] = useState('#858585')
  const [borderColor , setBorderColor] = useState('#B1B1B1')
  const [inputStyle , setInputStyle] = useState('px-[24px] py-[10px] rounded-[20px] border border-[${borderColor}] text-[16px]')
  const [inputSize , setInputSize] = useState('w-full h-[40px]')
  const [headInputStyle , setHeadInputStyle] = useState('text-[#27265C]  text-[16px]')
  const [noBtn , setNoBtn] = useState('bg-[#E9635E] text-white font-semibold text-[16px] rounded-[20px] w-full h-[44px] block')
  const [yesBtn , setYesBtn] = useState('bg-[#27265C] text-[#82BCFF] font-semibold text-[16px] rounded-[20px] w-full h-[44px] block')
  
  // Helper function to get input styles based on value
  const getInputStyles = (value: string, hasError: boolean = false) => {
    const hasValue = value && value.trim() !== '';
    const baseStyle = 'px-[24px] py-[10px] rounded-[20px] border text-[16px] w-full h-[40px] focus:border-[#9399FF] focus:outline-none';
    
    if (hasError) {
      return `${baseStyle} border-red-500 text-[#27265C]`;
    } else if (hasValue) {
      return `${baseStyle} border-[#9399FF] text-[#27265C]`;
    } else {
      return `${baseStyle} border-[#B1B1B1] text-[#858585]`;
    }
  };
  
  //for date
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // สร้าง ref

  // for image upload
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // for form validation
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  // for selected styles
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  // for form data
  const [formData, setFormData] = useState({
    artworkName: '',
    description: '',
    size: '',
    material: '',
    technique: '',
    shipping: '',
    phone: '',
    facebookName: '',
    facebookLink: '',
    website: '',
    startPrice: '',
    minBid: '',
    sellPrice: '',
    endTime: ''
  });

  // for checkbox
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // for character count
  const [wordCount, setWordCount] = useState(0);

  // for API submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedImages(prev => [...prev, ...imageFiles]);
  };

  // Validation functions
  const validateStep1 = () => {
    // Get only the current step's form elements
    const step1Container = document.querySelector('[data-step="1"]');
    if (!step1Container) return false;
    
    const requiredFields = step1Container.querySelectorAll('[required]');
    let isValid = true;
    let missingFields: string[] = [];
    let newFieldErrors: {[key: string]: string} = {};

    requiredFields.forEach((field) => {
      const input = field as HTMLInputElement;
      if (!input.value.trim()) {
        isValid = false;
        const label = input.previousElementSibling?.textContent || 'ฟิลด์นี้';
        const fieldName = label.replace('*', '').trim();
        missingFields.push(fieldName);
        
        // Set specific error messages for each field
        if (fieldName.includes('ชื่อผลงาน')) {
          newFieldErrors['artworkName'] = 'กรุณาใส่ชื่อผลงาน';
        } else if (fieldName.includes('คำอธิบาย')) {
          newFieldErrors['description'] = 'กรุณาใส่คำอธิบาย';
        } else if (fieldName.includes('ขนาดงาน')) {
          newFieldErrors['size'] = 'กรุณาใส่ขนาดงาน';
        } else if (fieldName.includes('วัสดุ')) {
          newFieldErrors['material'] = 'กรุณาใส่วัสดุ';
        } else if (fieldName.includes('วิธีสร้างงาน')) {
          newFieldErrors['technique'] = 'กรุณาใส่วิธีสร้างงาน';
        } else if (fieldName.includes('สไตล์งานศิลปะ')) {
          newFieldErrors['style'] = 'กรุณาเลือกสไตล์งานศิลปะ';
        } else if (fieldName.includes('ค่าจัดส่ง')) {
          newFieldErrors['shipping'] = 'กรุณาใส่ค่าจัดส่ง';
        } else if (fieldName.includes('เบอร์โทรศัพท์')) {
          newFieldErrors['phone'] = 'กรุณาใส่เบอร์โทรศัพท์';
        }
      }
    });

    if (selectedImages.length === 0) {
      isValid = false;
      missingFields.push('รูปภาพ');
      newFieldErrors['images'] = 'กรุณาเลือกรูปภาพ';
    }

    if (selectedStyles.length === 0) {
      isValid = false;
      missingFields.push('สไตล์งานศิลปะ');
      newFieldErrors['style'] = 'กรุณาเลือกสไตล์งานศิลปะ';
    }

    // Check if description exceeds 500 characters
    if (wordCount > 500) {
      isValid = false;
      missingFields.push('คำอธิบายเกิน 500 ตัวอักษร');
      newFieldErrors['description'] = 'คำอธิบายต้องไม่เกิน 500 ตัวอักษร';
    }

    // Check if phone number is exactly 10 digits
    if (formData.phone && formData.phone.length !== 10) {
      isValid = false;
      missingFields.push('เบอร์โทรศัพท์ต้องครบ 10 ตัวเลข');
      newFieldErrors['phone'] = 'เบอร์โทรศัพท์ต้องครบ 10 ตัวเลข';
    }

    setFieldErrors(newFieldErrors);

    if (!isValid) {
      setValidationMessage(`กรุณาใส่ข้อมูล: ${missingFields.join(', ')}`);
      setShowValidationPopup(true);
    }

    return isValid;
  };

  const validateStep2 = () => {
    // Get only the current step's form elements
    const step2Container = document.querySelector('[data-step="2"]');
    if (!step2Container) return false;
    
    const requiredFields = step2Container.querySelectorAll('[required]');
    let isValid = true;
    let missingFields: string[] = [];
    let newFieldErrors: {[key: string]: string} = {};

    requiredFields.forEach((field) => {
      const input = field as HTMLInputElement;
      if (!input.value.trim()) {
        isValid = false;
        const label = input.previousElementSibling?.textContent || 'ฟิลด์นี้';
        const fieldName = label.replace('*', '').trim();
        missingFields.push(fieldName);
        
        // Set specific error messages for each field
        if (fieldName.includes('ราคาเริ่มต้น')) {
          newFieldErrors['startPrice'] = 'กรุณาใส่ราคาเริ่มต้น';
        } else if (fieldName.includes('ประมูลเพิ่มขั้นต่ำ')) {
          newFieldErrors['minBid'] = 'กรุณาใส่ประมูลเพิ่มขั้นต่ำ';
        } else if (fieldName.includes('ราคาขาย')) {
          newFieldErrors['sellPrice'] = 'กรุณาใส่ราคาขาย';
        } else if (fieldName.includes('เวลาปิดประมูล')) {
          newFieldErrors['endTime'] = 'กรุณาเลือกเวลาปิดประมูล';
        }
      }
    });

    // Check if terms are accepted
    if (!isTermsAccepted) {
      isValid = false;
      missingFields.push('ยอมรับเงื่อนไขการประมูล');
      newFieldErrors['terms'] = 'กรุณายอมรับเงื่อนไขการประมูล';
    }

    setFieldErrors(newFieldErrors);

    if (!isValid) {
      setValidationMessage(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`);
      setShowValidationPopup(true);
    }

    return isValid;
  };

  const closeValidationPopup = () => {
    setShowValidationPopup(false);
    setValidationMessage('');
  };

  const clearFieldErrors = () => {
    setFieldErrors({});
  };

  const clearArtworkNameError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.artworkName;
      return newErrors;
    });
  };

  const clearDescriptionError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.description;
      return newErrors;
    });
  };

  const clearSizeError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.size;
      return newErrors;
    });
  };

  const clearMaterialError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.material;
      return newErrors;
    });
  };

  const clearTechniqueError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.technique;
      return newErrors;
    });
  };

  const clearStyleError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.style;
      return newErrors;
    });
  };

  const clearShippingError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.shipping;
      return newErrors;
    });
  };

  const clearPhoneError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.phone;
      return newErrors;
    });
  };

  const clearStartPriceError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.startPrice;
      return newErrors;
    });
  };

  const clearMinBidError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.minBid;
      return newErrors;
    });
  };

  const clearSellPriceError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.sellPrice;
      return newErrors;
    });
  };

  const clearEndTimeError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.endTime;
      return newErrors;
    });
  };

  const clearTermsError = () => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.terms;
      return newErrors;
    });
  };

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };  

  const handleExitConfirm = () => {
    setShowExitPopup(false);
    window.location.href = '/feed';
  };

  // Handle style selection
  const handleStyleSelect = (style: string) => {
    if (!selectedStyles.includes(style)) {
      setSelectedStyles(prev => [...prev, style]);
      clearStyleError();
    }
  };

  const handleStyleRemove = (styleToRemove: string) => {
    setSelectedStyles(prev => prev.filter(style => style !== styleToRemove));
  };

  // Handle form data updates
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle numeric input with validation
  const handleNumericInput = (field: string, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    updateFormData(field, numericValue);
  };

  // Handle phone number input with validation
  const handlePhoneInput = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    updateFormData('phone', numericValue);
    clearPhoneError();
  };

  // Count characters function
  const countWords = (text: string) => {
    if (!text || text.trim() === '') return 0;
    // Count characters instead of words
    return text.trim().length;
  };

  // Handle description change with character count
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Update form data first
    updateFormData('description', value);
    clearDescriptionError();
    
    // Count characters and update character count
    const count = countWords(value);
    setWordCount(count);
    
    // Clear error if character count is now valid
    if (count <= 500) {
      clearDescriptionError();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formDataToSend = new FormData();
      
      // Add images
      selectedImages.forEach((image, index) => {
        formDataToSend.append('image', image);
      });

      // Add other form fields
      formDataToSend.append('title', formData.artworkName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startingPrice', formData.startPrice);
      formDataToSend.append('buyNowPrice', formData.sellPrice);
      formDataToSend.append('minimumBidIncrement', formData.minBid);
      formDataToSend.append('endAt', formData.endTime);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('method', formData.technique);
      formDataToSend.append('style', selectedStyles.join(', '));
      formDataToSend.append('transportPrice', formData.shipping);
      formDataToSend.append('phone', formData.phone);
      
      // Optional fields
      if (formData.facebookName) {
        formDataToSend.append('fbName', formData.facebookName);
      }
      if (formData.facebookLink) {
        formDataToSend.append('fbLink', formData.facebookLink);
      }
      if (formData.website) {
        formDataToSend.append('websiteLink', formData.website);
      }

      // Get token from localStorage
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Send API request
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create auction');
      }

      const result = await response.json();
      
      // Show success notification
      setShowSuccessNotification(true);
      
      // Redirect to auction page after 2 seconds
      setTimeout(() => {
        window.location.href = `/auction_page/${result.id}?fromCreate=true`;
      }, 2000);

    } catch (error) {
      console.error('Error creating auction:', error);
      setValidationMessage('เกิดข้อผิดพลาดในการสร้างงานประมูล กรุณาลองใหม่อีกครั้ง');
      setShowValidationPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };


     return (
     <div className='bg-white w-[100vw] h-[100%] flex flex-col items-center'>
       <Navbar />
       
                                                 {/* Validation Popup */}
          {showValidationPopup && (
            <div className="fixed inset-0 bg-red-800 bg-opacity-50 flex flex-col items-center justify-end z-50">
              <Image src='/bidzy/characters/head.png' alt='bidzy character' width={100} height={100} className='object-contain max-w-[300px] w-full' />
              <div className="bg-white rounded-lg p-6 px-[24px] sm:px-[64px] w-full rounded-b-[0px] max-w-[768px]">
                <div className="text-center mb-6">
                  <p className="text-[#9399FF] font-semibold text-[20px] mb-2">กรุณาใส่ข้อมูลให้ครบ</p>
                  <p className="text-[16px] font-semibold text-[#27265C]">{validationMessage}</p>
                </div>
                <button
                  onClick={closeValidationPopup}
                  className="w-full bg-[#27265C] text-[#82BCFF] font-semibold py-2 px-4 rounded-[20px] hover:bg-opacity-90 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          )}

        {/* Loading Popup */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-[400px] w-full mx-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9399FF] mx-auto mb-4"></div>
                <p className="text-[#9399FF] font-semibold text-[20px] mb-2">กำลังสร้างงานประมูล</p>
                <p className="text-[16px] font-semibold text-[#27265C]">กรุณารอสักครู่...</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="fixed inset-0 bg-green-800 bg-opacity-50 flex flex-col items-center justify-end z-50">
            <Image src='/bidzy/characters/head.png' alt='bidzy character' width={100} height={100} className='object-contain max-w-[300px] w-full' />
            <div className="bg-white rounded-lg p-6 px-[24px] sm:px-[64px] w-full rounded-b-[0px] max-w-[768px]">
              <div className="text-center mb-6">
                <p className="text-[#9399FF] font-semibold text-[20px] mb-2">โพสต์ประมูลสำเร็จ!</p>
                <p className="text-[16px] font-semibold text-[#27265C]">กำลังนำคุณไปยังหน้างานประมูล...</p>
              </div>
            </div>
          </div>
        )}

        {/* Exit Confirmation Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-red-800 bg-opacity-50 flex flex-col items-center justify-end z-50">
            <Image src='/bidzy/characters/head.png' alt='bidzy character' width={100} height={100} className='object-contain max-w-[300px] w-full' />
            <div className="bg-white rounded-lg p-6 px-[24px] sm:px-[64px] w-full rounded-b-[0px]  max-w-[768px]">
              <div className="text-center mb-6">
                <p className="text-[#9399FF] font-semibold text-[20px] mb-2">คุณยืนยันการออกจากหน้านี้</p>
                <p className="text-[16px] font-semibold text-[#27265C]">ข้อมูลที่คุณกรอกจะไม่ถูกบันทึก</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={()=>setShowExitPopup(false)}
                  className="flex-1 bg-[#E9635E] text-white font-semibold py-2 px-4 rounded-[20px] hover:bg-opacity-90 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitConfirm}
                  className="flex-1 bg-[#27265C] text-white font-semibold py-2 px-4 rounded-[20px] hover:bg-opacity-90 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      <div className='w-[327px] sm:w-[608px]'>
      <div className='h-[56px] flex justify-between items-center relative mb-[30px]'>
             <ChevronLeftIcon
         onClick={() => {
           if (flowNum === 1) {
             setShowExitPopup(true);
           } else if (flowNum === 2) {
             setFlowNum(1);
           } else if (flowNum === 3) {
             setFlowNum(2);
           }
         }}
       />
          {flowNum == 3 ? (
            <div>
              <span className='text-[24px] text-[#27265C] font-semibold'>Preview your post</span>
            </div>
          ): (
            <div className='flex flex-col'>
              <span className='font-semibold text-[24px] text-[#27265C]'>สร้างงานประมูล</span>
              <span className='font-semibold text-[24px] text-[#9399FF] absolute left-1/2 transform -translate-x-1/2 top-[40px]'>STEP {flowNum}/2</span>
            </div>
          )}
          <div></div>
          {/* <CloudIcon /> */}
      </div>
      <form className='block w-full'>
                 {/* หนัาแรก */}
         <div data-step="1" className={`${flowNum != 1 && ('hidden')}  w-full flex flex-col gap-[12px] items-center mb-[70px]`}>
                 <label className='flex flex-col gap-[4px] w-full'>
           <label className={`${headInputStyle}`}>ชื่อผลงาน<span className='!text-[#E9635E]'>*</span></label>
                                               <input 
               required 
               className={getInputStyles(formData.artworkName, !!fieldErrors.artworkName)} 
               placeholder='ชื่อผลงาน'  
               type="text"
               value={formData.artworkName}
               onChange={(e) => {
                 updateFormData('artworkName', e.target.value);
                 clearArtworkNameError();
               }}
             />
           {fieldErrors.artworkName && (
             <span className="text-red-500 text-sm mt-1">{fieldErrors.artworkName}</span>
           )}
         </label>
                 <input 
           ref={fileInputRef}
           id='img' 
           type="file" 
           multiple 
           accept="image/*" 
           required 
           className='hidden' 
           onChange={handleFileChange}
         />
         
         {/* Show upload area only when no images selected */}
         {selectedImages.length === 0 && (
           <label htmlFor='img' className='w-full'>
             <div 
               className="bg-[linear-gradient(90deg,#CFD2FF,#FCEDFF,#B7E5FF)] rounded-[24px] w-full h-[304px] sm:h-[456px] flex items-center justify-center cursor-pointer"
               onDragOver={handleDragOver}
               onDrop={handleDrop}
             >
               <div className='bg-white/25 w-[294.1px] h-[260.94px] sm:w-[441.6px] sm:h-[391.41px] border border-white rounded-[16px] flex flex-col gap-[26px] items-center justify-center'>
                 <Image src='/uploadicon.png' width={57} height={57} className='sm:w-[86.5px] sm:h-[86.5px]' alt='upload icon' />
                 <div className='bg-[radial-gradient(circle,_#E6F2FF,_#B4D7FF)] sm:w-[252.5px] sm:h-[64.95px] rounded-[21px] font-semibold text-[26px] text-[#27265C] flex items-center justify-center'>Upload image</div>
                 <span className='flex flex-col items-center justify-center'>
                   <span className='text-[21px] text-[#27265C]'>or drag and drop a file here</span>
                   <span className='text-[15px] text-[#4A4D80]'>JPG and PNG to tracking.</span>
                 </span>
               </div>
             </div>
           </label>
         )}
         
                                       {/* Image Gallery with upload button */}
           {selectedImages.length > 0 && (
             <div className='w-full'>
               <label className={`${headInputStyle} mb-2 block`}>ภาพที่เลือก ({selectedImages.length} รูป)</label>
             <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
               {selectedImages.map((image, index) => (
                 <div key={index} className="relative flex-shrink-0">
                   <div className="relative w-[327px] h-[327px] sm:w-[456px] sm:h-[456px] rounded-lg overflow-x-hidden  border-1">
                     <Image
                       src={URL.createObjectURL(image)}
                       alt={`Image ${index + 1}`}
                       fill
                       className="object-contain"
                     />
                   </div>
                   <button
                     onClick={() => handleRemoveImage(index)}
                     className="absolute top-0 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
                   >
                     ×
                   </button>
                 </div>
               ))}
               
                               {/* Upload button at the end of scroll */}
                <label htmlFor='img' className="flex-shrink-0">
                  <div 
                    className="relative w-[327px] h-[327px] sm:w-[456px] sm:h-[456px] rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-[linear-gradient(90deg,#CFD2FF,#FCEDFF,#B7E5FF)]"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className='bg-white/25 w-[294.1px] h-[260.94px] sm:w-[441.6px] sm:h-[391.41px] border border-white rounded-[16px] flex flex-col gap-[26px] items-center justify-center'>
                      <Image src='/uploadicon.png' width={57} height={57} className='sm:w-[86.5px] sm:h-[86.5px]' alt='upload icon' />
                      <div className='bg-[radial-gradient(circle,_#E6F2FF,_#B4D7FF)] sm:w-[252.5px] sm:h-[64.95px] rounded-[21px] font-semibold text-[20px] text-[#27265C] flex items-center justify-center'>
                        เพิ่มภาพ
                      </div>
                      <span className='flex flex-col items-center justify-center'>
                        <span className='text-[16px] text-[#27265C]'>คลิกเพื่อเพิ่มภาพเพิ่มเติม</span>
                        <span className='text-[12px] text-[#4A4D80]'>หรือลากและวางไฟล์ที่นี่</span>
                      </span>
                    </div>
                  </div>
                </label>
             </div>
           </div>
         )}
         {/* Error message for images - moved below buttons */}
         {fieldErrors.images && (
            <span className="text-red-500 text-sm mt-1 block text-center">{fieldErrors.images}</span>
          )}
                                   <label className='flex flex-col gap-[4px] w-full'>
            <label className={`${headInputStyle}`} >คำอธิบาย<span className='!text-[#E9635E]'>*</span></label>
                               <textarea 
                required 
                className={`${getInputStyles(formData.description, !!fieldErrors.description)} resize-none min-h-[40px] max-h-[120px] scrollbar-hide`}
                placeholder='อธิบายงานของคุณ'  
                value={formData.description}
                onChange={handleDescriptionChange}
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
                           <div className='flex justify-between w-full items-start'>
                <div className='flex-1'>
                  {fieldErrors.description && (
                    <span className="text-red-500 text-sm mt-1">{fieldErrors.description}</span>
                  )}
                </div>
                <label style={{color: wordCount > 500 ? '#E9635E' : (formData.description && formData.description.trim() !== '' ? '#27265C' : '#858585')}} className='text-sm mt-1 ml-2 flex-shrink-0'>
                  {wordCount}/500 ตัวอักษร
                </label>
              </div>
          </label>
                                   <label className='flex flex-col gap-[4px] w-full'>
            <span className={`${headInputStyle}`}>ขนาดงาน<span className='!text-[#E9635E]'>*</span></span>
                                                   <input 
                required 
                className={getInputStyles(formData.size, !!fieldErrors.size)} 
                placeholder='cm. x cm.' 
                type="text"
                value={formData.size}
                onChange={(e) => {
                  updateFormData('size', e.target.value);
                  clearSizeError();
                }}
              />
            {fieldErrors.size && (
              <span className="text-red-500 text-sm mt-1">{fieldErrors.size}</span>
            )}
          </label>
          <label className='flex flex-col gap-[4px] w-full'>
            <span className={`${headInputStyle}`}>วัสดุ<span className='!text-[#E9635E]'>*</span></span>
                                                   <input 
                required 
                className={getInputStyles(formData.material, !!fieldErrors.material)} 
                placeholder='วัสดุที่ใช้ทำผลงาน' 
                type="text"
                value={formData.material}
                onChange={(e) => {
                  updateFormData('material', e.target.value);
                  clearMaterialError();
                }}
              />
            {fieldErrors.material && (
              <span className="text-red-500 text-sm mt-1">{fieldErrors.material}</span>
            )}
          </label>
                 <label className='flex flex-col gap-[4px] w-full'>
           <span className={`${headInputStyle}`}>วิธีสร้างงาน<span className='!text-[#E9635E]'>*</span></span>
                                               <input 
               required 
               className={getInputStyles(formData.technique, !!fieldErrors.technique)} 
               placeholder='วิธีการที่ใช้สร้างผลงาน' 
               type="text"
               value={formData.technique}
               onChange={(e) => {
                 updateFormData('technique', e.target.value);
                 clearTechniqueError();
               }}
             />
           {fieldErrors.technique && (
             <span className="text-red-500 text-sm mt-1">{fieldErrors.technique}</span>
           )}
         </label>
                                   <label className='flex flex-col gap-[4px] w-full'>
            <span className={`${headInputStyle}`}>สไตล์งานศิลปะ<span className='!text-[#E9635E]'>*</span></span>
            
            {/* Style Selection Dropdown */}
            <div className="relative">
              <select 
                style={{ color: fontColor }} 
                className={`${inputSize} ${inputStyle} text-opacity-50 focus:border-[#9399FF] focus:outline-none appearance-none pr-10`}
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleStyleSelect(e.target.value);
                  }
                }}
              >
                <option value="" disabled className='text-white/10'>เลือกประเภทงานของคุณ</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Acrylic Painting">Acrylic Painting</option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="WaterColor Painting">WaterColor Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Art toy">Art toy</option>
                <option value="Printing">Printing</option>
                <option value="Character Design">Character Design</option>
                <option value="Photography">Photography</option>
                <option value="Landscape">Landscape</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="w-5 h-5 text-[#858585]" />
              </div>
            </div>

           {/* Selected Styles Tags */}
           {selectedStyles.length > 0 && (
             <div className="flex flex-col gap-2 mt-2">
               {selectedStyles.map((style, index) => (
                 <div key={index} className="flex items-center justify-between bg-[#E8F5E8] rounded-full px-4 py-2">
                   <span className="text-[#27265C] text-sm">{style}</span>
                   <button
                     type="button"
                     onClick={() => handleStyleRemove(style)}
                     className="text-[#27265C] hover:text-red-500 transition-colors ml-2"
                   >
                     ×
                   </button>
                 </div>
               ))}
             </div>
           )}

           {fieldErrors.style && (
             <span className="text-red-500 text-sm mt-1">{fieldErrors.style}</span>
           )}
         </label>
                 <label className='flex flex-col gap-[4px] w-full'>
           <span className={`${headInputStyle}`}>ค่าจัดส่ง<span className='!text-[#E9635E]'>*</span></span>
                                               <input 
               required 
               className={getInputStyles(formData.shipping, !!fieldErrors.shipping)} 
               placeholder='ระบุค่าจัดส่ง' 
               type="text"
               value={formData.shipping}
               onChange={(e) => {
                 handleNumericInput('shipping', e.target.value);
                 clearShippingError();
               }}
             />
           {fieldErrors.shipping && (
             <span className="text-red-500 text-sm mt-1">{fieldErrors.shipping}</span>
           )}
         </label>
        <label className='flex flex-col gap-[12px] w-full'>
          <span className='font-semibold text-[16px] text-[#27265C]'>ช่องทางการติดต่อของคุณ</span>
                     <span className='flex flex-col gap-[4px]' >
             <span className={`${headInputStyle}`}>เบอร์โทรศัพท์<span className='!text-[#E9635E]'>*</span></span>
                                                       <input 
                 required 
                 className={getInputStyles(formData.phone, !!fieldErrors.phone)} 
                 placeholder='เบอร์โทรศัพท์' 
                 type="text"
                 value={formData.phone}
                 onChange={(e) => {
                   handlePhoneInput(e.target.value);
                 }}
               />  
             {fieldErrors.phone && (
               <span className="text-red-500 text-sm mt-1">{fieldErrors.phone}</span>
             )}
           </span>
          <span className='flex flex-col gap-[4px]'>
            <span className={`${headInputStyle}`}>Facebook</span>
            <input 
              className={getInputStyles(formData.facebookName)} 
              placeholder='ชื่อเฟสบุ๊ค' 
              type="text"
              value={formData.facebookName}
              onChange={(e) => updateFormData('facebookName', e.target.value)}
            />  
            <input 
              className={`${getInputStyles(formData.facebookLink)} mt-[8px]`} 
              placeholder='ลิงค์เฟสบุ๊ค' 
              type="text"
              value={formData.facebookLink}
              onChange={(e) => updateFormData('facebookLink', e.target.value)}
            />  
          </span>
          <span className='flex flex-col gap-[4px]'>
            <span className={`${headInputStyle}`}>Website</span>
            <input 
              className={getInputStyles(formData.website)} 
              placeholder='ชื่อเว็บไซต์' 
              type="text"
              value={formData.website}
              onChange={(e) => updateFormData('website', e.target.value)}
            />  
          </span>
        </label>
                                   <div className='flex flex-row w-full gap-[16px] h-[92px] items-center'>
            <button type='button' onClick={()=> setShowExitPopup(true)} className={`${noBtn}`}>Cancel</button>
            <button type='button' className={`${yesBtn}`} onClick={() => {
              if (validateStep1()) {
                setFlowNum(2);
              }
            }}>Next</button>
          </div>
          
          

          </div>
          
                     {/* หนัาสอง */}
                      <div data-step="2" className={`${flowNum != 2 && ('hidden')} w-full flex flex-col gap-[12px] items-center mb-[70px]`}>
                           <label className='flex flex-col gap-[4px] w-full'>
                <label className={`${headInputStyle}`}>ราคาเริ่มต้น<span className='!text-[#E9635E]'>*</span></label>
                                                                   <input 
                    required 
                    className={getInputStyles(formData.startPrice, !!fieldErrors.startPrice)} 
                    placeholder='ราคาเริ่มต้น' 
                    type="text"
                    value={formData.startPrice}
                    onChange={(e) => {
                      handleNumericInput('startPrice', e.target.value);
                      clearStartPriceError();
                    }}
                  />
                {fieldErrors.startPrice && (
                  <span className="text-red-500 text-sm mt-1">{fieldErrors.startPrice}</span>
                )}
              </label>
              <label className='flex flex-col gap-[4px] w-full'>
                <label className={`${headInputStyle}`}>ประมูลเพิ่มขั้นต่ำ<span className='!text-[#E9635E]'>*</span></label>
                                                                   <input 
                    required 
                    className={getInputStyles(formData.minBid, !!fieldErrors.minBid)} 
                    placeholder='ราคาเพิ่มขั้นต่ำ' 
                    type="text"
                    value={formData.minBid}
                    onChange={(e) => {
                      handleNumericInput('minBid', e.target.value);
                      clearMinBidError();
                    }}
                  />
                {fieldErrors.minBid && (
                  <span className="text-red-500 text-sm mt-1">{fieldErrors.minBid}</span>
                )}
              </label>
              <label className='flex flex-col gap-[4px] w-full'>
                <label className={`${headInputStyle}`}>ราคาขาย<span className='!text-[#E9635E]'>*</span></label>
                                                                   <input 
                    required 
                    className={getInputStyles(formData.sellPrice, !!fieldErrors.sellPrice)} 
                    placeholder='ราคาขาย' 
                    type="text"
                    value={formData.sellPrice}
                    onChange={(e) => {
                      handleNumericInput('sellPrice', e.target.value);
                      clearSellPriceError();
                    }}
                  />
                {fieldErrors.sellPrice && (
                  <span className="text-red-500 text-sm mt-1">{fieldErrors.sellPrice}</span>
                )}
              </label>
                         <label className='flex flex-col gap-[4px] w-full'>
               <label className={`${headInputStyle}`}>เวลาปิดประมูล<span className='!text-[#E9635E]'>*</span></label>
               <div className={`${fieldErrors.endTime ? 'border-red-500' : 'border-none'} rounded-[20px] border relative`} >
       <label htmlFor="end_at" className=" block w-full h-full absolute top-2 left-4 pointer-events-auto !text-black/50 z-10"   onClick={() => inputRef.current?.showPicker?.()}>
       {hasSelectedDate ? "" : "เลือกวันจบประมูล"}
         </label>
           <input
      id="end_at"
        className={`${getInputStyles(formData.endTime, !!fieldErrors.endTime)} ${
          hasSelectedDate ? '!text-[#27265C]' : '!text-white'
        } focus:border-[#9399FF] focus:outline-none`} type="datetime-local"
        ref={inputRef}
        name="end_at"
                        onChange={(e) => {
            setHasSelectedDate(!!e.target.value);
            updateFormData('endTime', e.target.value);
            clearEndTimeError();
          }} 
        required
      />
     </div>
     {fieldErrors.endTime && (
       <span className="text-red-500 text-sm mt-1">{fieldErrors.endTime}</span>
     )}
             </label>
                         <label className='flex flex-row gap-[8px] items-center justify-center'>
               <input 
                 type="checkbox" 
                 checked={isTermsAccepted}
                 onChange={(e) => {
                   setIsTermsAccepted(e.target.checked);
                   if (e.target.checked) {
                     clearTermsError();
                   }
                 }}
               />
               <span className='text-[#858585] text-[16px]'>คุณยอมรับ</span>
               <button type='button' className='font-semibold text-[16px] text-[#1A6EDB]'>เงื่อนไขการประมูล</button>
             </label>
             {fieldErrors.terms && (
               <span className="text-red-500 text-sm mt-1 text-center">{fieldErrors.terms}</span>
             )}
                         <div className='flex flex-row w-full gap-[16px] h-[92px] items-center'>
               <button type='button' className={`${noBtn}`}onClick={() => setFlowNum(1)}>Back</button>
               <button type='button' className={`${yesBtn}`} onClick={() => {
                 if (validateStep2()) {
                   setFlowNum(3);
                 }
               }}>Preview</button>
             </div>
          </div>
        
                                                                                                                                   {/* หนัาสาม */}
             <div className={`${flowNum != 3 && ('hidden')} w-full flex flex-col gap-[12px] mb-[70px]`}>
                               <div className="w-full">
                  <div className={`flex gap-3 pb-2 ${selectedImages.length === 1 ? 'justify-center' : 'overflow-x-auto scrollbar-hide'}`}>
                    {/* Main Image */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-[327px] h-[327px] sm:w-[456px] sm:h-[456px] rounded-lg overflow-hidden border-1 border-gray-200">
                        {selectedImages.length > 0 ? (
                          <Image
                            src={URL.createObjectURL(selectedImages[0])}
                            alt='ภาพหลัก'
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <Image src='/Artwork.png' width={327} height={426} alt='ภาพศิลปะ' />
                        )}
                      </div>
                    </div>
                    
                    {/* Additional Images */}
                    {selectedImages.slice(1).map((image, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <div className="relative w-[327px] h-[327px] sm:w-[456px] sm:h-[456px] rounded-lg overflow-hidden border-1 border-gray-200">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 2}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
               
               {/* Info Section - moved outside scrollbar */}
               <div className='flex gap-[16px]'>
                 <Image src='/Artwork.png' width={48} height={48} alt='ภาพศิลปะ' />
                 <div className='flex flex-col'>
                   <span className='text-[14px] text-[#858585]'>Creator</span>
                   <span className='text-[#9399FF] font-semibold text-[20px]'>Art Mosphere</span>
                 </div>
               </div>
                                                               <div className='text-[#27265C] text-[16px] flex flex-col gap-[4px] sm:gap-[12px]'>
                   <span className='font-semibold text-[20px]'>รายละเอียดผลงาน</span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ชื่อผลงาน :</div><span>{formData.artworkName || 'Arty'}</span></span>
                                       <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>คำอธิบาย :</div><span style={{whiteSpace: 'pre-wrap'}}>{formData.description || 'Arty'}</span></span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ขนาด :</div><span>{formData.size || '6 นิ้ว'}</span></span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วิธีสร้างงาน :</div><span>{formData.technique || 'Printed Canvas'}</span></span>
                   
                   {/* Style Tags */}
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>สไตล์งาน :</div>
                     {selectedStyles.length > 0 ? (
                       <div className="flex flex-col flex-wrap gap-2">
                         {selectedStyles.map((style, index) => (
                           <div key={index} className="bg-[#E8F5E8] rounded-full px-3 py-1">
                             <span className="text-[#27265C] text-sm">{style}</span>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <span>Digital Art</span>
                     )}
                   </span>
                   
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ค่าส่ง :</div><span>{formData.shipping || '100'}</span></span>
                   <span className='font-semibold text-[20px]'>ช่องทางศิลปิน</span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>เบอร์โทรศัพท์ :</div><span>{formData.phone || 'link ig'}</span></span>
                   {formData.facebookName && <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Facebook :</div><span>{formData.facebookName}</span></span>}
                   {formData.facebookLink && <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ลิงค์ Facebook :</div><a href={formData.facebookLink} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">{formData.facebookLink}</a></span>}
                   {formData.website && <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>Website :</div><a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-[#1A6EDB] hover:underline">{formData.website}</a></span>}
                   <span className='font-semibold text-[20px]'>รายละเอียดราคาประมูล</span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาเริ่มต้น :</div><span>{formData.startPrice || '1500'} B</span></span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ประมูลเพิ่มขั้นต่ำ :</div><span>{formData.minBid || '1500'} B</span></span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>ราคาขาย :</div><span>{formData.sellPrice || '1500'} B</span></span>
                   <span className='flex flex-row'><div className='w-[100px] sm:w-[180px] lg:w-[200px] block'>วันปิดประมูล :</div><span>{formData.endTime || '20/10/18 00:00AM'}</span></span>
                   <span className='text-[#1A6EDB] font-semibold text-[16px] self-center text-center mt-[24px]'>ตรวจสอบโพสต์แล้วไปต่อได้เลย</span>
                 </div>
                                      <div className='flex flex-row w-full gap-[16px] h-[92px] items-center justify-center'>
               <button type='button' className={`${noBtn}`} onClick={() => setFlowNum(2)}>Back</button>
               <button 
                 type='button' 
                 className={`${yesBtn} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                 onClick={handleSubmit}
                 disabled={isSubmitting}
               >
                 {isSubmitting ? 'กำลังโพสต์...' : 'Post'}
               </button>
             </div>
           </div>

       
      </form>
      </div>
    </div>
  )
}

export default page