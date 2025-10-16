import React from 'react';
import { Card } from '@/components/ui/card';

export default function Sidebar() {
  return (
    <Card className="hidden w-64 shrink-0 p-4 shadow-lg lg:block">
      <nav className="space-y-1 text-sm">
        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          My Account
        </h3>

        {/* Current/Active link */}
        <a
          href="/orders"
          className="block rounded-lg bg-neutral-100 p-2 font-semibold text-primary dark:bg-neutral-800 dark:text-primary"
        >
          Orders
        </a>
        <a
          href="/password"
          className="block rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Change Password
        </a>
        <a
          href="/logout"
          className="block w-full rounded-lg p-2 text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Logout
        </a>
      </nav>
    </Card>
  );
}
