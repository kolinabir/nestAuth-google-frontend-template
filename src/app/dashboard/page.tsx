// app/dashboard/page.tsx
"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useProtectedQuery } from "@/store/api/authApi";

const DashboardPage = () => {
  const { data } = useProtectedQuery();
  console.log(data, "dataFRom ProtectedQuery");
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1>Dashboard</h1>
        {/* Your protected content here */}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
