import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '../layout/commonLayout';
import PlaylistForm from './components/PlaylistForm';
declare function route(name: string, parameters?: any): string;

interface PlaylistEditProps {
    playlist: { id: number; name: string; description: string | null };
}
const pageInfo = {
    title: 'Edit Playlist',
    btnText: null,
    url: '',
};
export default function PlaylistEdit({ playlist }: PlaylistEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Playlists', href: route('playlist.index') },
    ];

    return (
          <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
            <Head title={`Edit: ${playlist.name}`} />
            <PlaylistForm playlist={playlist} submitRoute="playlist.update" />
        </CommonLayout>
    );
}
