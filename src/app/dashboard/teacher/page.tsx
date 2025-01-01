'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 
  'May', 'Jun', 'Jul', 'Aug', 
  'Sep', 'Oct', 'Nov'
];

const ReviewStatCard = ({ stars, count, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Star className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-gray-600">
          {stars} Star Reviews
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {count}
        </p>
      </div>
    </div>
  </div>
);

export default function MonthlyReviewsPage() {
  const generateMonthlyData = () => {
    return MONTHS.map(month => ({
      month,
      fiveStars: Math.floor(Math.random() * (63 - 15 + 1)) + 15,
      fourStars: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
      threeStars: Math.floor(Math.random() * (30 - 5 + 1)) + 5,
      belowThree: Math.floor(Math.random() * (20 - 3 + 1)) + 3
    }));
  };

  const monthlyReviewsData = generateMonthlyData();
  const totalReviews = monthlyReviewsData.reduce((acc, month) => 
    acc + month.fiveStars + month.fourStars + month.threeStars + month.belowThree, 0
  );

  const reviewStats = [
    { stars: 5, count: monthlyReviewsData.reduce((sum, month) => sum + month.fiveStars, 0), color: 'text-yellow-500' },
    { stars: 4, count: monthlyReviewsData.reduce((sum, month) => sum + month.fourStars, 0), color: 'text-green-500' },
    { stars: 3, count: monthlyReviewsData.reduce((sum, month) => sum + month.threeStars, 0), color: 'text-blue-500' },
    { stars: 'Below 3', count: monthlyReviewsData.reduce((sum, month) => sum + month.belowThree, 0), color: 'text-red-500' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Reviews Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {reviewStats.map((stat, index) => (
          <ReviewStatCard 
            key={index}
            stars={stat.stars}
            count={stat.count}
            color={stat.color}
          />
        ))}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-purple-50">
              <Star className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalReviews}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Monthly Reviews Performance
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyReviewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="fiveStars" 
              stroke="#eab308" 
              name="5 Stars"
            />
            <Line 
              type="monotone" 
              dataKey="fourStars" 
              stroke="#22c55e" 
              name="4 Stars"
            />
            <Line 
              type="monotone" 
              dataKey="threeStars" 
              stroke="#3b82f6" 
              name="3 Stars"
            />
            <Line 
              type="monotone" 
              dataKey="belowThree" 
              stroke="#ef4444" 
              name="Below 3 Stars"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}