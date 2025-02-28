import { ModeToggle } from "@/context/modetoggle";
import { SignalHigh } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-white border-b border-gray-200 py-2 sticky top-0 flex items-center justify-between md:px-14 px-2">
        <Link href="/" className="font-bold dark:text-black">
          <h1 className="flex items-center">
            <SignalHigh />
            <span className="text-xl font-bold">
              Sign<span className="text-primary_main">Bridge</span>
            </span>
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <div className="flex size-12 md:size-8 rounded-full bg-slate-800"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
