import { ModeToggle } from "@/context/modetoggle";
import { SignalHigh } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="border-b sticky top-0 w-full bg-white  dark:bg-gray-500">
        <div className="container flex items-center justify-between py-4 px-2 md:px-12">
          <div className="flex items-center gap-2">
            <SignalHigh />
            <h1 className="text-xl font-bold">
              Sign<span className="text-primary_main">Bridge</span>
            </h1>
          </div>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/" className="font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground">
                  About
                </Link>
              </li>
              <ModeToggle />
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
