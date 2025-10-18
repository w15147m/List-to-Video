import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonLayout from '../../layout/commonLayout';
import VideoForm from './components/VideoForm';


declare function route(name: string, parameters?: any): string;

interface PlaylistOption {
    id: number;
    name: string;
}
interface VideoCreateProps {
    playlists: PlaylistOption[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Video Admin', href: '/video-admin' },
    { title: 'Video List', href: route('video.index') },
];

const pageInfo = {
    title: 'Create New Video',
    btnText: null,
    url: '',
};

export default function VideoCreate({ playlists }: VideoCreateProps) {
    return (
        <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
            <Head title="Create Video" />
            <VideoForm submitRoute="video.store" playlists={playlists} />
        </CommonLayout>
    );
}
