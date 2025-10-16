import { type BreadcrumbItem } from '@/types';
import CommonLayout from './layout/commonLayout';
// Assuming these UI components exist and support dark mode via Tailwind:
import { Badge } from '@/components/ui/badge';

// --- 1. Hardcoded Data Structure (For DUMMY Component) ---

interface Order {
    id: number | string;
    grand_total: string;
    sub_total: string;
    shipping: string;
    order_date: string;
    payment_status: 'Paid' | 'Not Paid';
    status: 'Pending' | 'Delivered';
}

const DUMMY_ORDERS: Order[] = [
    {
        id: 31,
        grand_total: '$166.00',
        sub_total: '$160.00',
        shipping: '$6.00',
        order_date: '11 Dec 2024',
        payment_status: 'Paid',
        status: 'Pending',
    },
    {
        id: 30,
        grand_total: '$13.00',
        sub_total: '$10.00',
        shipping: '$3.00',
        order_date: '11 Dec 2024',
        payment_status: 'Paid',
        status: 'Pending',
    },
    {
        id: 29,
        grand_total: '$166.00',
        sub_total: '$160.00',
        shipping: '$6.00',
        order_date: '11 Dec 2024',
        payment_status: 'Paid',
        status: 'Pending',
    },
    {
        id: 27,
        grand_total: '$83.00',
        sub_total: '$80.00',
        shipping: '$3.00',
        order_date: '09 Dec 2024',
        payment_status: 'Not Paid',
        status: 'Pending',
    },
    {
        id: 24,
        grand_total: '$94.00',
        sub_total: '$82.00',
        shipping: '$12.00',
        order_date: '04 Dec 2024',
        payment_status: 'Paid',
        status: 'Delivered',
    },
    {
        id: 23,
        grand_total: '$12.00',
        sub_total: '$10.00',
        shipping: '$2.00',
        order_date: '02 Dec 2024',
        payment_status: 'Paid',
        status: 'Delivered',
    },
    // Add more dummy data as needed...
];

// --- 2. Helper Function for Badges ---

const getStatusVariant = (
    status: Order['status'] | Order['payment_status'],
) => {
    // Note: You must ensure your actual Badge component supports these variant names.
    switch (status) {
        case 'Paid':
        case 'Delivered':
            return 'default'; // Success/Green
        case 'Pending':
            return 'secondary'; // Warning/Yellow (The image uses yellow for Pending)
        case 'Not Paid':
            return 'destructive'; // Danger/Red
        default:
            return 'secondary';
    }
};

// --- 3. The Combined Component ---

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'My Account', href: '/account' },
    { title: 'Orders', href: '/orders' },
];

export default function PlaylistPage() {
    // Component uses hardcoded data
    const orders = DUMMY_ORDERS;

    return (
        <CommonLayout breadcrumbs={breadcrumbs}>
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Grand Total
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Sub Total
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Shipping
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Order Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Payment
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900/50">
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        >
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-neutral-900 dark:text-neutral-100">
                                #{order.id}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                {order.grand_total}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                {order.sub_total}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                {order.shipping}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                {order.order_date}
                            </td>

                            {/* Payment Badge */}
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <Badge
                                    variant={getStatusVariant(
                                        order.payment_status,
                                    )}
                                >
                                    {order.payment_status === 'Not Paid'
                                        ? 'not paid'
                                        : 'Paid'}
                                </Badge>
                            </td>

                            {/* Status Badge */}
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <Badge
                                    variant={getStatusVariant(order.status)}
                                    className="min-w-[5rem] justify-center"
                                >
                                    {order.status}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CommonLayout>
    );
}
