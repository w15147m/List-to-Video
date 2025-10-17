import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Video } from 'lucide-react';
import CommonLayout from '../layout/commonLayout';

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

// 🆕 ADDED PAGE INFO
const pageInfo = {
    title: 'Video Management', // The h3 in CommonLayout will use this
    btnText: 'Create Video',   // The button text
    url: '/video/create',      // The button link
};
// --------------------

export default function VideoListPage({ videos }: VideoListPageProps) {
    return (
        // 🆕 PASS PAGE INFO
        <CommonLayout breadcrumbs={breadcrumbs} pageInfo={pageInfo}>
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
                        {videos &&
                            videos.map((video) => (
                                <tr
                                    key={video.id}
                                    className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                >
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                        #{video.id}
                                    </td>
                                    <td className="max-w-xs truncate px-4 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {video.title}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                        <span className="font-medium capitalize">
                                            {video.template_name}
                                        </span>
                                        <span className="ml-2 text-xs text-gray-400 uppercase">
                                            ({video.type})
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                        {video.playlist_name || '—'}
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <span
                                            className={getStatusClasses(
                                                video.status,
                                            )}
                                        >
                                            {video.status.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* Actions Cell with Icon Buttons */}
                                    <td className="space-x-2 px-4 py-4 text-center whitespace-nowrap">
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
                                            <Link
                                                href={`/video/${video.id}/edit`}
                                            >
                                                <Pencil className="size-4" />
                                            </Link>
                                        </Button>

                                        <Link
                                            href={`/video/${video.id}`}
                                            method="delete"
                                            preserveScroll
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 p-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                            title="Delete Item"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        'Are you sure you want to delete this item?',
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <Trash2 className="size-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        {videos && videos.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                                >
                                    No videos found. Create a video to get
                                    started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CommonLayout>
    );
}
