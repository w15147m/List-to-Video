import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import { BreadcrumbItem } from '@/types';

interface Props {
 breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}
export default function CommonLayout({ children, breadcrumbs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="mx-auto flex w-full max-w-7xl gap-6 p-4">
                <Sidebar />
                <div className="min-w-0 flex-1">
                    <Card className="overflow-hidden p-0 shadow-lg">
                        <div className="overflow-x-auto">{children}</div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
