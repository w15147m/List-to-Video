import React from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import CommonLayout from './layout/commonLayout';
// Badge import removed
import { Link } from '@inertiajs/react'; // For action buttons
// Assuming you have a standard Button component (like from Shadcn/ui)
import { Button } from '@/components/ui/button';
// Placeholder for an icon component (adjust path/name as needed)
import { Pencil, Trash2 } from 'lucide-react';

// --- 1. Define Props Interface ---

interface Playlist {
    id: number;
    name: string;
    description: string | null;
}

interface PlaylistPageProps {
    playlists: Playlist[];
}

// --- 2. The Playlist Component ---

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Video Admin', href: '/video-admin' },
    { title: 'Playlists', href: '/playlist' },
];

export default function PlaylistPage({ playlists }: PlaylistPageProps) {
    return (
        <CommonLayout breadcrumbs={breadcrumbs}>
            <Head title="Playlists" />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Playlist Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Description
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900/50">
                        {playlists.map((playlist) => (
                            <tr
                                key={playlist.id}
                                className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            >
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                    #{playlist.id}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {playlist.name}
                                </td>
                                <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm truncate">
                                    {playlist.description || 'No description provided.'}
                                </td>

                                {/* Actions Cell with Icon Buttons */}
                                <td className="px-4 py-4 text-center whitespace-nowrap space-x-2">
                                    {/* Edit Button */}
                                    {/* Use Link if navigation is needed, otherwise use Button with an onClick handler */}
                                    <Button
                                        asChild // Use asChild if using Inertia Link for navigation
                                        variant="outline"
                                        size="icon"
                                        title={`Edit ${playlist.name}`}
                                    >
                                        <Link href={`/playlist/${playlist.id}/edit`}>
                                            <Pencil className="size-4" />
                                        </Link>
                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        title={`Delete ${playlist.name}`}
                                        // For actual delete, you'd use a method="delete" Link or an onClick handler
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {playlists.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                    No playlists found. Start by creating a new one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CommonLayout>
    );
}
