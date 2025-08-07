import { Suspense } from "react"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminProvider } from "@/components/admin/admin-context"

export const metadata = {
  title: "Admin Dashboard - Apex Electronics",
  description: "Comprehensive admin panel for managing products, orders, and analytics",
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <AdminDashboard />
        </Suspense>
      </div>
    </AdminProvider>
  )
}
