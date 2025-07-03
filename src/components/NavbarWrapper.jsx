"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = ["/dashboard", "/login" , "/register", ];
  const isDashboard = hiddenRoutes.some(route => pathname.startsWith(route));

  return !isDashboard ? <Navbar /> : null;
}
