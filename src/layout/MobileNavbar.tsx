import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logs, SignalHigh } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Learn More", href: "/learn" },
];

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden block">
        <Logs />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <h1 className="flex items-center">
            <SignalHigh />
            <span className="text-xl font-bold">
              Sign<span className="text-primary_main">Bridge</span>
            </span>
          </h1>
        </SheetHeader>
        <div className="space-y-4">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.name}>
              <Link href={link.href} className="font-medium block">
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
