"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center">
      <Link
        className={`border px-2 py-1 link ${
          pathname === "/" ? "bg-[#E3E3E3] pointer-events-none" : ""
        }`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`border px-2 py-1 link ${
          pathname === "/auth/register"
            ? "bg-[#E3E3E3] pointer-events-none"
            : ""
        }`}
        href="/auth/register"
      >
        Sign in
      </Link>
      <Link
        className={`border px-2 py-1 link ${
          pathname === "/auth" ? "bg-[#E3E3E3] pointer-events-none	" : ""
        }`}
        href="/auth"
      >
        Login
      </Link>
      <Link
        className={`border px-2 py-1 link ${
          pathname === "/roadmaps" ? "bg-[#E3E3E3] pointer-events-none" : ""
        }`}
        href="/roadmaps"
      >
        RoadMaps
      </Link>
    </div>
  );
};

export default Header;
