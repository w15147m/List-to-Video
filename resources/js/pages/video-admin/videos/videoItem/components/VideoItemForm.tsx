import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ImageGalleryInput from '@/pages/video-admin/components/ImageGalleryInput';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
declare function route(name: string, parameters?: any): string;

interface VideoItemFormProps {
    videoItem?: VideoItem;
    videoId: number;
    submitRoute: string;
}

interface VideoItemFormData {
    heading: string;
    subheading: string;
    main_value: string;
    media_url: string;
    video_id: number;
}

interface VideoItem {
    id: number;
    video_id: number;
    sequence: number;
    heading: string | null;
    subheading: string | null;
    main_value: string | null;
    media_url: string | null;
}

export default function VideoItemForm({
    videoItem,
    videoId,
    submitRoute,
}: VideoItemFormProps) {
    const isEditing = !!videoItem;
    const { data, setData, post, put, processing, errors } = useForm<
        VideoItemFormData & { gallery: any }
    >({
        heading: videoItem?.heading ?? '',
        subheading: videoItem?.subheading ?? '',
        main_value: videoItem?.main_value ?? '',
        media_url: videoItem?.media_url ?? '',
        image_url: videoItem?.image_url ?? '',
        video_id: videoId,
        gallery: {}, // ✅ add gallery field
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const routeParams = isEditing ? { videoItem: videoItem.id } : {};
        const submitData = {
            ...data,
        };

        if (isEditing) {
            put(route(submitRoute, routeParams), { data: submitData });
        } else {
            post(route(submitRoute), { data: submitData });
        }
    };

    return (
        <div className="p-6 pt-0">
            <form onSubmit={submit} className="space-y-6">
                {/* Layout Grid */}
                <div className="grid grid-cols-[180px_1fr] items-start gap-4">
                    {/* ✅ Left column — Image Upload */}
                    <div className="">
                        <div className="w-full max-w-[220px]">
                            <Label htmlFor="heading">Heading (Optional)</Label>
                            <ImageGalleryInput
                                initialGalleryImages={
                                    data.media_url
                                        ? [
                                              {
                                                  id: 1,
                                                  image_url: data.image_url,
                                                  name: 'Selected',
                                              },
                                          ]
                                        : []
                                }
                                onGalleryChange={(images) => {
                                    if (images.length > 0) {
                                        setData('gallery', images[0]);
                                        setData(
                                            'media_url',
                                            images[0].image_url,
                                        );
                                    } else {
                                        setData('media_url', '');
                                    }
                                }}
                                isSingle={true}
                                isEditing={isEditing}
                            />
                            {errors.media_url && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.media_url}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ✅ Right column — Form Fields */}
                    <div className=" ">
                        <div>
                            <Label htmlFor="heading">Heading (Optional)</Label>
                            <Input
                                id="heading"
                                type="text"
                                value={data.heading}
                                onChange={(e) =>
                                    setData('heading', e.target.value)
                                }
                                className={
                                    errors.heading ? 'border-red-500' : ''
                                }
                            />
                            {errors.heading && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.heading}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="subheading">
                                Subheading (Optional)
                            </Label>
                            <Input
                                id="subheading"
                                type="text"
                                value={data.subheading}
                                onChange={(e) =>
                                    setData('subheading', e.target.value)
                                }
                                className={
                                    errors.subheading ? 'border-red-500' : ''
                                }
                            />
                            {errors.subheading && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.subheading}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="main_value">Main Value</Label>
                            <Textarea
                                id="main_value"
                                value={data.main_value}
                                onChange={(e) =>
                                    setData('main_value', e.target.value)
                                }
                                className={
                                    errors.main_value ? 'border-red-500' : ''
                                }
                                rows={4}
                            />
                            {errors.main_value && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.main_value}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ✅ Buttons aligned to right */}
                <div className="flex items-center justify-end space-x-3 pt-4">
                    <Button type="submit" disabled={processing}>
                        {isEditing ? 'Update Item' : 'Create Item'}
                    </Button>
                    <Button asChild variant="secondary">
                        <Link
                            href={route('videoItem.index', { video: videoId })}
                        >
                            Cancel
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
