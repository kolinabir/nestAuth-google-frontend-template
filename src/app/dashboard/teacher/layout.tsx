'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, FileText, Settings, LogOut, Menu, X, LayoutDashboard, Bell } from 'lucide-react';

const TEACHER_MENU_ITEMS = [
  {
    icon: <LayoutDashboard className="mr-3 w-5 h-5" />,
    label: 'Dashboard',
    href: '/dashboard/teacher',
  },
  {
    icon: <User className="mr-3 w-5 h-5" />,
    label: 'Profile',
    href: '/dashboard/teacher/profile',
  },
  {
    icon: <FileText className="mr-3 w-5 h-5" />,
    label: 'Reviews',
    href: '/dashboard/teacher/reviews',
  },
  {
    icon: <Settings className="mr-3 w-5 h-5" />,
    label: 'Settings',
    href: '/dashboard/teacher/settings',
  },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile & Desktop Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center">
            <User className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          </div>
          <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {TEACHER_MENU_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="
                    flex items-center px-4 py-2 
                    text-gray-700 hover:bg-blue-50 
                    rounded-md transition-colors
                  "
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center px-4 py-2 
                  text-gray-700 hover:bg-red-50 
                  rounded-md transition-colors
                "
              >
                <LogOut className="mr-3 w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-[22px] flex justify-between items-center">
          <button onClick={toggleSidebar} className="md:hidden text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <Bell size={24}  />
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
