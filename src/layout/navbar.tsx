import { ModeToggle } from "@/context/modetoggle";
import { SignalHigh } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MobileNavbar } from "./MobileNavbar";

const Navbar = () => {
  return (
    <>
      <header className="border-b sticky top-0 w-full bg-white  dark:bg-gray-500 z-50">
        <div className="container flex items-center justify-between py-4 px-2 md:px-12">
          <h1 className="flex items-center">
            <SignalHigh />
            <span className="text-xl font-bold">
              Sign<span className="text-primary_main">Bridge</span>
            </span>
          </h1>
          <menu className="hidden md:flex items-center gap-10">
            <li>
              <Link href="/" className="font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-medium">
                Learn More
              </Link>
            </li>
          </menu>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="bg-primary_main text-white md:px-4 md:py-2 px-2 py-1 rounded-md">
                Get Started
              </button>
            </Link>
            <ModeToggle />
            <MobileNavbar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
