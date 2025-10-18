import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '@/pages/video-admin/layout/commonLayout';
import VideoForm from './VideoForm';

declare function route(name: string, parameters?: any): string;

interface Video {
    id: number;
    title: string;
    template_name: string;
    type: 'short' | 'full';
    playlist_id: number | null;
}

interface PlaylistOption {
    id: number;
    name: string;
}

interface VideoEditProps {
    video: Video;
    playlists: PlaylistOption[];
}

const pageInfo = {
    title: 'Edit Video',
    btnText: null,
    url: '',
};

export default function VideoEdit({ video, playlists }: VideoEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Video Admin', href: '/video-admin' },
        { title: 'Video List', href: route('video.index') },
    ];

    return (
        <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
            <Head title={`Edit: ${video.title}`} />
            <VideoForm video={video} submitRoute="video.update" playlists={playlists} />
        </CommonLayout>
    );
}
