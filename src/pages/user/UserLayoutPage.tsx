import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";
import UserLayout from "@/components/layout/UserLayout";

export default function UserLayoutPage() {
  return (
    <UserLayout>
      <Outlet />
      <Footer />
    </UserLayout>
  );
}
