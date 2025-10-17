import React, { FormEventHandler } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
declare function route(name: string, parameters?: any): string;

interface VideoItemFormData {
    heading: string;
    subheading: string;
    main_value: string;
    media_url: string;
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

interface VideoItemFormProps {
    videoItem?: VideoItem;
    videoId: number;
    submitRoute: string;
}

export default function VideoItemForm({ videoItem, videoId, submitRoute }: VideoItemFormProps) {
    const isEditing = !!videoItem;
    const { data, setData, post, put, processing, errors } = useForm<VideoItemFormData>({
        heading: videoItem?.heading ?? '',
        subheading: videoItem?.subheading ?? '',
        main_value: videoItem?.main_value ?? '',
        media_url: videoItem?.media_url ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const routeParams = {
            video: videoId,
            ...(isEditing ? { video_item: videoItem.id } : {})
        };

        if (isEditing) {
            put(route(submitRoute, routeParams));
        } else {
            post(route(submitRoute, routeParams));
        }
    };

    return (
        <div className="p-6 pt-0">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <Label htmlFor="heading">Heading (Optional)</Label>
                    <Input
                        id="heading"
                        type="text"
                        value={data.heading}
                        onChange={(e) => setData('heading', e.target.value)}
                        className={errors.heading ? 'border-red-500' : ''}
                    />
                    {errors.heading && <p className="text-sm text-red-500 mt-1">{errors.heading}</p>}
                </div>
                <div>
                    <Label htmlFor="subheading">Subheading (Optional)</Label>
                    <Input
                        id="subheading"
                        type="text"
                        value={data.subheading}
                        onChange={(e) => setData('subheading', e.target.value)}
                        className={errors.subheading ? 'border-red-500' : ''}
                    />
                    {errors.subheading && <p className="text-sm text-red-500 mt-1">{errors.subheading}</p>}
                </div>
                <div>
                    <Label htmlFor="main_value">Main Value</Label>
                    <Textarea
                        id="main_value"
                        value={data.main_value}
                        onChange={(e) => setData('main_value', e.target.value)}
                        className={errors.main_value ? 'border-red-500' : ''}
                        rows={3}
                    />
                    {errors.main_value && <p className="text-sm text-red-500 mt-1">{errors.main_value}</p>}
                </div>
                <div>
                    <Label htmlFor="media_url">Media URL (Image/Video Link)</Label>
                    <Input
                        id="media_url"
                        type="url"
                        value={data.media_url}
                        onChange={(e) => setData('media_url', e.target.value)}
                        className={errors.media_url ? 'border-red-500' : ''}
                    />
                    {errors.media_url && <p className="text-sm text-red-500 mt-1">{errors.media_url}</p>}
                </div>

                <div className="flex items-center justify-end space-x-2">
                    <Button type="submit" disabled={processing}>
                        {isEditing ? 'Update Item' : 'Create Item'}
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href={route('videoItem.index', { video: videoId })}>Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
