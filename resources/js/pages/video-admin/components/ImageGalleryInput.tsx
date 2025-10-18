import axios from 'axios';
import { Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';

interface ImageData {
    id: number;
    image_url: string;
    name: string;
}

interface ImageGalleryInputProps {
    initialGalleryImages?: ImageData[];
    onGalleryChange: (images: ImageData[]) => void;
    isEditing?: boolean;
    isSingle?: boolean;
}
const ImageGalleryInput: React.FC<ImageGalleryInputProps> = ({
    initialGalleryImages = [],
    onGalleryChange,
    isSingle = false,
}) => {
    const [isLoader, setLoader] = useState(false);
    const [galleryImages, setGalleryImages] =
        useState<ImageData[]>(initialGalleryImages);

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

            const token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const response = await axios.post('/temp-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': token || '',
                },
            });

            const { data } = response.data;

            const imageObj: ImageData = {
                id: data.id,
                image_url: data.image_url,
                name: data.name,
            };

            const updatedImages = isSingle
                ? [imageObj]
                : [...galleryImages, imageObj];

            setGalleryImages(updatedImages);
            onGalleryChange(updatedImages);
        } catch (error: any) {
            console.error(
                'Upload Error:',
                error.response?.data || error.message,
            );
        } finally {
            setLoader(false);
            e.target.value = '';
        }
    };

    const handleTrash = (imageId: number) => {
        const filteredImages = galleryImages.filter(
            (img) => img.id !== imageId,
        );
        setGalleryImages(filteredImages);
        onGalleryChange(filteredImages);
    };
    const disableUpload = isSingle && galleryImages.length >= 1;
   return (
        <div className="mb-6">
            <div className="flex w-full flex-wrap gap-4">
                {!disableUpload && (
                    <div className="h-48 w-44">
                        <label
                            className={`custom-file-upload block h-full ${
                                disableUpload
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'cursor-pointer'
                            }`}
                        >
                            <div
                                className={`flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                                    disableUpload
                                        ? 'border-gray-300 bg-gray-100'
                                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                {isLoader ? (
                                    <div className="flex flex-col items-center p-4">
                                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Uploading...
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center p-4 text-gray-600">
                                        {!disableUpload && <Upload></Upload>}
                                        <div className="mt-1 text-center text-sm">
                                            {disableUpload
                                                ? 'only one image can upload'
                                                : 'Image added'}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                className="sr-only"
                                onChange={handleFile}
                                accept="image/*"
                                disabled={isLoader || disableUpload} // ✅ Disable when one image exists
                            />
                        </label>
                    </div>
                )}

                {galleryImages.map((image) => (

                    <div
                        key={image.id}
                        className="relative h-48 w-44 overflow-hidden rounded-lg border border-gray-200 shadow-md"
                    >
                        <img
                            src={image.image_url}
                            alt={image.name}
                            className="h-full w-full object-cover"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white opacity-80 transition-opacity hover:opacity-100"
                            onClick={() => handleTrash(image.id)}
                            aria-label="Delete image"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGalleryInput;
