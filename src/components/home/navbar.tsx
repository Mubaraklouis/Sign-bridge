import { ModeToggle } from "@/context/modetoggle";
import { SignalHigh } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="border-b sticky top-0 w-full bg-white  dark:bg-gray-500 z-50">
        <div className="container flex items-center justify-between py-4 px-2 md:px-12">
          <nav className="flex items-center gap-2">
            <SignalHigh />
            <h1 className="text-xl font-bold">
              Sign<span className="text-primary_main">Bridge</span>
            </h1>
          </nav>
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
              <button className="bg-primary_main text-white px-4 py-2 rounded-md">
                Get Started
              </button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
