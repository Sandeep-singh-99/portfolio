"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/admin-login", "/admin"];

  const shouldHideNavBar = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideNavBar) return null;

  return <NavBar />;
}
