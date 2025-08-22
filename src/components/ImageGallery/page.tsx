"use client"
import React from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: File[] | string[]
  onRemoveImage?: (index: number) => void
  className?: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onRemoveImage, 
  className = '' 
}) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border-2 border-gray-200">
              {typeof image === 'string' ? (
                // สำหรับ URL string
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                // สำหรับ File object
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {onRemoveImage && (
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
