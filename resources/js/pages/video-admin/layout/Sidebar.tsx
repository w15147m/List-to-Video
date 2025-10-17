// resources/js/pages/video-admin/Playlist/layout/Sidebar.tsx (or similar path)

import { Card } from '@/components/ui/card';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    // 1. Use the usePage hook to get the current URL path
    const { url } = usePage();

    const mainNavItems: NavItem[] = [
        {
            title: 'Playlist', // Corrected title casing for better UI
            href: '/playlist', // Use the clean path for comparison
        },
        {
            title: 'Video List', // Corrected title casing
            href: '/video',
        },
          {
            title: 'Video Item', // Corrected title casing
            href: '/videoItem',
        },

    ];

    return (
        <Card className="hidden w-64 shrink-0 p-4 shadow-lg lg:block">
            <nav className="space-y-1 text-sm">
                <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Admin Menu
                </h3>
                {mainNavItems.map((item) => {
                    const href =
                        typeof item.href === 'string'
                            ? item.href
                            : (item.href?.url ?? '');
                    const isActive = url.startsWith(href);
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`block rounded-lg p-2 transition-colors ${
                                isActive
                                    ? 'bg-neutral-100 font-semibold text-primary dark:bg-neutral-800 dark:text-primary' // Active styles
                                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800' // Inactive styles
                            } `}
                        >
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </Card>
    );
}
