"use client"; // This component is now a client component

import { usePathname } from "next/navigation";
import AppLayout from "../AppLayout/AppLayout";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return isHomepage ? children : <AppLayout>{children}</AppLayout>;
}
