import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from '../layout/commonLayout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Video } from 'lucide-react';

// --- 1. Define Props Interface ---

// Interface for a single video item (matching your migration)
interface VideoItem {
    id: number;
    title: string;
    template_name: string;
    type: 'short' | 'full';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    // Optionally include the playlist name if you eager-load it in Laravel
    playlist_name: string | null;
}

// Interface for the component's props (data sent from Laravel)
interface VideoListPageProps {
    videos: VideoItem[];
}

// --- 2. Helper Functions (Optional for Status Badges) ---

// Helper function to map video status to a color/style (if you bring back Badges)
const getStatusClasses = (status: VideoItem['status']) => {
    switch (status) {
        case 'completed':
            return 'text-green-600 dark:text-green-400 font-semibold';
        case 'processing':
            return 'text-yellow-600 dark:text-yellow-400';
        case 'failed':
            return 'text-red-600 dark:text-red-400';
        case 'pending':
        default:
            return 'text-gray-500 dark:text-gray-400';
    }
};

// --- 3. The Video List Component ---

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Video Admin', href: '/video-admin' },
    { title: 'Video List', href: '/video' },
];

export default function VideoListPage({ videos }: VideoListPageProps) {
    return (
        <CommonLayout breadcrumbs={breadcrumbs}>
            <Head title="Video List" />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Title
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Template / Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Playlist
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Status
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900/50">
                        {videos.map((video) => (
                            <tr
                                key={video.id}
                                className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            >
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                    #{video.id}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100 max-w-xs truncate">
                                    {video.title}
                                </td>
                                <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    <span className="font-medium capitalize">{video.template_name}</span>
                                    <span className="ml-2 text-xs uppercase text-gray-400">({video.type})</span>
                                </td>
                                <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    {video.playlist_name || '—'}
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <span className={getStatusClasses(video.status)}>
                                        {video.status.toUpperCase()}
                                    </span>
                                </td>

                                {/* Actions Cell with Icon Buttons */}
                                <td className="px-4 py-4 text-center whitespace-nowrap space-x-2">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        title={`View ${video.title}`}
                                    >
                                        <Link href={`/video/${video.id}`}>
                                            <Video className="size-4" />
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="icon"
                                        title={`Edit ${video.title}`}
                                    >
                                        <Link href={`/video/${video.id}/edit`}>
                                            <Pencil className="size-4" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        title={`Delete ${video.title}`}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {videos.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                    No videos found. Create a video to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CommonLayout>
    );
}
