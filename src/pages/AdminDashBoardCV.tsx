import React from 'react'
import CvManagementTable from "@/components/table/CvManagementTable";
import CustomBreadcrumb from "@/components/layout/CustomBreadcrumb";

export default function AdminDashboardCV() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý CV</h2>
      </div>

      <CustomBreadcrumb />
      
      <div className="grid grid-cols-1 gap-4">
        <CvManagementTable />
      </div>
    </div>
  )
}
