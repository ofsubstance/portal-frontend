import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/footer/Footer";
import UserLayout from "@/components/common/layout/UserLayout";

export default function UserLayoutPage() {
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
    <UserLayout>
      <Outlet />
      <Footer />
    </UserLayout>
  );
}
