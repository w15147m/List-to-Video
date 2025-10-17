import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '../layout/commonLayout';
import PlaylistForm from './components/PlaylistForm';
declare function route(name: string, parameters?: any): string;

interface PlaylistEditProps {
    playlist: { id: number; name: string; description: string | null };
}

export default function PlaylistEdit({ playlist }: PlaylistEditProps) {
    console.log('====================================');
    console.log(playlist);
    console.log('====================================');
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Playlists', href: route('playlist.index') },
        { title: playlist.name, href: route('playlist.edit', playlist.id) },
        { title: 'Edit', href: route('playlist.edit', playlist.id) },
    ];

    return (
        <CommonLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${playlist.name}`} />
            <h1 className="text-3xl font-bold mb-6">Edit Playlist: {playlist.name}</h1>
            {/* Pass the existing playlist data and the update route */}
            <PlaylistForm playlist={playlist} submitRoute="playlist.update" />
        </CommonLayout>
    );
}
