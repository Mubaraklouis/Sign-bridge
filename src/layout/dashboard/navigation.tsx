"use client";

import { navData } from "@/data/nav-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathName = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 w-full p-2 bg-white dark:text-black border-t border-gray-200">
        <div className="flex items-center justify-around max-w-xl mx-auto md:gap-4 gap-3">
          {navData.map((item) => {
            const isActive = item.href === pathName;
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex flex-col items-center md:gap-1 md:text-base text-sm pt-2 ${
                  isActive ? "text-blue-500 font-bold" : ""
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
