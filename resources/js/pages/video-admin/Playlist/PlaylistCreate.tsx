import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonLayout from '../layout/commonLayout';
import PlaylistForm from './components/PlaylistForm';

const breadcrumbs: BreadcrumbItem[] = [];
const pageInfo = {
    title: 'Create New Playlist',
    btnText: null,
    url: '',
};
export default function PlaylistCreate() {
    return (
        <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
            <Head title="Create Playlist" />
            <PlaylistForm submitRoute="playlist.store" />
        </CommonLayout>
    );
}
