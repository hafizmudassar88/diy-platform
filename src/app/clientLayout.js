"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isPublicRoute =
    ["/auth/login", "/auth/signup", "/templete/editor"].includes(pathname) ||
    pathname.startsWith("/templete/") || pathname.startsWith("/resume-template/");

  return (
    <>
      {!isPublicRoute && <Navbar />}
      <main
        className={`w-full h-full !bg-white ${!isPublicRoute ? "mt-32 md:mt-14" : ""
          } `}
      >
        {children}
      </main>
      {!isPublicRoute && <Footer />}
    </>
  );
}
