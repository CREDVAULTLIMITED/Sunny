'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  LineChart,
  Settings,
  Users,
  ShieldCheck,
  Globe,
  History,
  AlertCircle,
  Wallet,
  CreditCard as PaymentMethodIcon,
  ArrowDownToLine,
  WifiOff,
  HardDrive,
  BarChart4,
  Code
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
}

function SidebarItem({ href, icon, title, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{title}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  // Group navigation items by category
  const navigationGroups = [
    {
      title: "Main",
      items: [
        {
          title: 'Dashboard',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
          title: 'Transactions',
          href: '/dashboard/transactions',
          icon: <CreditCard className="w-5 h-5" />
        },
        {
          title: 'Customers',
          href: '/dashboard/customers',
          icon: <Users className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Payments",
      items: [
        {
          title: 'Payment Methods',
          href: '/dashboard/payment-methods',
          icon: <PaymentMethodIcon className="w-5 h-5" />
        },
        {
          title: 'Payouts',
          href: '/dashboard/payouts',
          icon: <ArrowDownToLine className="w-5 h-5" />
        },
        {
          title: 'Offline Queue',
          href: '/dashboard/offline-queue',
          icon: <WifiOff className="w-5 h-5" />
        },
        {
          title: 'Hardware',
          href: '/dashboard/hardware',
          icon: <HardDrive className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Monitoring",
      items: [
        {
          title: 'Analytics',
          href: '/dashboard/analytics',
          icon: <LineChart className="w-5 h-5" />
        },
        {
          title: 'Fraud & Risk',
          href: '/dashboard/fraud',
          icon: <ShieldCheck className="w-5 h-5" />
        },
        {
          title: 'Global Payments',
          href: '/dashboard/global',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Insights & Reports',
          href: '/dashboard/insights',
          icon: <BarChart4 className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Other",
      items: [
        {
          title: 'Developers',
          href: '/dashboard/developers',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: <Settings className="w-5 h-5" />
        }
      ]
    }
  ];

  // Flatten for backward compatibility if needed
  const navigation = navigationGroups.flatMap(group => group.items);

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Sunny Payments</h2>
      </div>
      <nav className="space-y-6">
        {navigationGroups.map((group, index) => (
          <div key={index} className="space-y-1">
            {group.title && (
              <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2 px-3">
                {group.title}
              </h3>
            )}
            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}

