import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '../../layout/commonLayout';
import VideoItemForm from './components/VideoItemForm';
declare function route(name: string, parameters?: any): string;

interface VideoItem {
    id: number;
    video_id: number;
    sequence: number;
    heading: string | null;
    subheading: string | null;
    main_value: string | null;
    media_url: string | null;
}
interface VideoItemEditProps {
    video: { id: number; title: string };
    video_item: VideoItem;
}

export default function VideoItemEdit({ video, video_item }: VideoItemEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Video Admin', href: '/video-admin' },
  ];

    const pageInfo = {
        title: `Edit Item #${video_item.sequence} for: ${video.title}`,
        btnText: null,
        url: '',
    };

    return (
        <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
            <Head title={`Edit Item: ${video.title}`} />
            <VideoItemForm
                videoId={video.id}
                videoItem={video_item}
                submitRoute="videoItem.update"
            />
        </CommonLayout>
    );
}
