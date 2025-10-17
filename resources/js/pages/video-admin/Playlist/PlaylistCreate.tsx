import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '../layout/commonLayout';
import PlaylistForm from './components/PlaylistForm';

const breadcrumbs: BreadcrumbItem[] = [
  
];

export default function PlaylistCreate() {
    return (
        <CommonLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Playlist" />
            <h1 className="text-3xl font-bold mb-6">Create New Playlist</h1>
            <PlaylistForm submitRoute="playlist.store" />
        </CommonLayout>
    );
}
