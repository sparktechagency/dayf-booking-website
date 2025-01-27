"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function NavLink({ label, href }) {
  const currentPath = usePathname();
  const isActivePath = currentPath === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-[1.1rem] font-normal",
        isActivePath ? "font-bold text-p1" : "text-[#626262]",
        styles.hoverAnimatedUnderline,
      )}
    >
      {label}
    </Link>
  );
}
