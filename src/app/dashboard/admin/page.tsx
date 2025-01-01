'use client';

import React from 'react';
import { 
  Users, 
  FileText, 
  MessageCircle, 
  AlertTriangle 
} from 'lucide-react';

const StatCard = ({ 
  icon, 
  title, 
  value, 
  className = '' 
}: { 
  icon: React.ReactNode, 
  title: string, 
  value: number | string, 
  className?: string 
}) => (
  <div className={`
    bg-white p-6 rounded-lg shadow-md 
    flex items-center justify-between
    ${className}
  `}>
    <div className="space-y-2">
      <h3 className="text-sm text-gray-500 uppercase">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="bg-blue-50 p-3 rounded-full">
      {icon}
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Total Users"
          value={1245}
          className="border-l-4 border-blue-500"
        />
        <StatCard 
          icon={<FileText className="w-6 h-6 text-green-600" />}
          title="Total Reviews"
          value={578}
          className="border-l-4 border-green-500"
        />
        <StatCard 
          icon={<MessageCircle className="w-6 h-6 text-purple-600" />}
          title="Feedback"
          value={203}
          className="border-l-4 border-purple-500"
        />
        <StatCard 
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          title="Suspicious Reviews"
          value={42}
          className="border-l-4 border-red-500"
        />
      </div>

      
    </div>
  );
}