import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Pencil } from 'lucide-react';
import DeleteButton from '../../components/DeleteButton';
import EditButton from '../../components/EditButton';
import CommonLayout from '../../layout/commonLayout';
declare function route(name: string, parameters?: any): string;

// --- 1. Define Props Interface ---
interface VideoItem {
    id: number;
    sequence: number;
    heading: string | null;
    subheading: string | null;
    main_value: string | null;
    media_url: string | null;
}
interface Video {
    id: number;
    title: string;
}
interface VideoItemPageProps {
    video: Video;
    video_items: VideoItem[];
}

// --- 2. The Video Item List Component ---
export default function VideoItemPage({
    video,
    video_items,
}: VideoItemPageProps) {
    console.log('====================================');
    console.log(video_items);
    console.log('====================================');
    const pageInfo = {
        title: `Items for: ${video.title}`,
        btnText: 'New Item',
        url: route('videoItem.create', { video: video.id }),
    };

    return (
        <CommonLayout pageInfo={pageInfo}>
            <Head title={`Items for: ${video.title}`} />
            <div className="overflow-x-auto pt-2">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                        <tr>
                            <th className="w-16 px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Seq.
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Heading / Subheading
                            </th>
                            <th className="w-24 px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Main Value
                            </th>
                            <th className="w-32 px-4 py-3 text-center text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Reorder
                            </th>
                            <th className="w-32 px-4 py-3 text-center text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900/50">
                        {video_items &&
                            video_items.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                >
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                        {item.sequence}
                                    </td>
                                    <td className="max-w-lg px-4 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                        {item.heading && (
                                            <div>{item.heading}</div>
                                        )}
                                        {item.subheading && (
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {item.subheading}
                                            </div>
                                        )}
                                        {!item.heading &&
                                            !item.subheading &&
                                            `Item #${item.id}`}
                                    </td>
                                    <td className="px-4 py-4 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                                        {item.main_value?.substring(0, 50) ||
                                            '—'}
                                        {item.main_value &&
                                            item.main_value.length > 50 &&
                                            '...'}
                                    </td>
                                    {/* Reorder Actions */}
                                    <td className="space-x-1 px-4 py-4 text-center whitespace-nowrap">
                                        {index > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Move Up"
                                            >
                                                <ArrowUp className="size-4" />
                                            </Button>
                                        )}
                                        {index < video_items.length - 1 && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Move Down"
                                            >
                                                <ArrowDown className="size-4" />
                                            </Button>
                                        )}
                                    </td>

                                    {/* Edit/Delete Actions */}
                                    <td className="space-x-2 px-4 py-4 text-center whitespace-nowrap">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="icon"
                                            title="Edit Item"
                                        >
                                            <Link
                                                href={route('videoItem.edit', {
                                                    video: video.id,
                                                    videoItem: item.id,
                                                })}
                                            >
                                                <Pencil className="size-4" />
                                            </Link>
                                        </Button>
                                        <DeleteButton
                                            route={`/videoItem/${item.id}`}
                                        ></DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        {video_items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                                >
                                    This video has no items yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CommonLayout>
    );
}
