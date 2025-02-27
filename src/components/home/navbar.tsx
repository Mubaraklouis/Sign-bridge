import { SignalHigh } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="border-b">
        <div className="container flex items-center justify-between py-4 px-2 md:px-12">
          <div className="flex items-center gap-2">
            <SignalHigh />
            <h1 className="text-xl font-bold">
              Sign<span className="text-blue-500">Bridge</span>
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
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
