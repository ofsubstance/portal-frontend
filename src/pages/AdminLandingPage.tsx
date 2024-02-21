import AdminLayout from "../components/layout/AdminLayout";
import { Outlet } from "react-router-dom";

function AdminLandingPage() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default AdminLandingPage;
