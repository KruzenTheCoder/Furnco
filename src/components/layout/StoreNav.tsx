"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StoreNav() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Deals", href: "/deals" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "About Us", href: "/about" },
    { name: "Account", href: "/account" },
  ];

  return (
    <nav className="hidden md:flex gap-6 items-center text-sm font-semibold text-gray-800">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-furnco-purple transition-colors pb-1 border-b-2 ${
              isActive 
                ? "border-furnco-purple text-furnco-purple" 
                : "border-transparent text-gray-800"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}