import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AdminLayout from "@/components/common/layout/AdminLayout";

export default function AdminLayoutPage() {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!scrollRef.current) {
      scrollRef.current = document.getElementsByTagName(
        "main"
      )[0] as HTMLDivElement;
    }

    scrollRef.current.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
