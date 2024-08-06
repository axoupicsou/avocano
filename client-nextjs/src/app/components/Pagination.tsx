"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  // Implement your component logic here
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page") || 1) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    // JSX code for your component's UI goes here
    <div className="flex w-full justify-evenly">
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={createPageURL(i + 1)}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md ${
            currentPage === i + 1 ? "bg-blue-700" : ""
          }`}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
