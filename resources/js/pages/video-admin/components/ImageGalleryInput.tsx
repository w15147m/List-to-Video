import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

interface ImageData {
  id: number;
  image_url: string;
  name: string;
}

interface ImageGalleryInputProps {
  initialGalleryImages?: ImageData[];
  onGalleryChange: (images: ImageData[]) => void;
  isEditing?: boolean;
}

const ImageGalleryInput: React.FC<ImageGalleryInputProps> = ({
  initialGalleryImages = [],
  onGalleryChange,
}) => {
  const [isLoader, setLoader] = useState(false);
  const [galleryImages, setGalleryImages] = useState<ImageData[]>(initialGalleryImages);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    const file = e.target.files?.[0];
    if (!file) {
      setLoader(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const response = await axios.post('/temp-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': token || '',
        },
      });

      const { data } = response.data;

      // Create a full object
      const imageObj: ImageData = {
        id: data.id,
        image_url: data.image_url,
        name: data.name,
      };

      // Update local state
      const updatedImages = [...galleryImages, imageObj];
      setGalleryImages(updatedImages);

      // Send back to parent
      onGalleryChange(updatedImages);

    } catch (error: any) {
      console.error('Upload Error:', error.response?.data || error.message);
    } finally {
      setLoader(false);
      e.target.value = '';
    }
  };

  const handleTrash = (imageId: number) => {
    const filteredImages = galleryImages.filter(img => img.id !== imageId);
    setGalleryImages(filteredImages);
    onGalleryChange(filteredImages);
  };

  return (
    <div className='mb-6'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>Images</label>

      <div className='flex flex-wrap w-full gap-4'>
        {/* Upload Input */}
        <div className='w-44 h-48'>
          <label className="custom-file-upload block h-full">
            <div
              className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isLoader ? (
                <div className="flex flex-col items-center p-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="mt-2 text-sm text-gray-500">Loading...</div>
                </div>
              ) : (
                <div className="flex flex-col items-center p-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4v-1.889a4 4 0 011.666-3.187l1.444-1.049A4 4 0 0111.55 6H15a4 4 0 014 4v4a4 4 0 01-4 4H7z" />
                    <polyline points="12 8 12 16" />
                    <polyline points="9 13 12 16 15 13" />
                  </svg>
                  <div className="mt-1 text-sm text-gray-600">Upload</div>
                  <div className="text-xs text-gray-400">image</div>
                </div>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              className="sr-only"
              onChange={handleFile}
              accept="image/*"
              disabled={isLoader}
            />
          </label>
        </div>

        {/* Image Gallery */}
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className='relative w-44 h-48 border border-gray-200 shadow-md rounded-lg overflow-hidden'
          >
            <img
              src={image.image_url}
              alt={image.name}
              className='w-full h-full object-cover'
            />
            <button
              type="button"
              className='absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white opacity-80 hover:opacity-100 transition-opacity'
              onClick={() => handleTrash(image.id)}
              aria-label="Delete image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryInput;
