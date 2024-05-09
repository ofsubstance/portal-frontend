import AdminLayout from "@/components/layout/AdminLayout";
import { Outlet } from "react-router-dom";

export default function AdminLayoutPage() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
