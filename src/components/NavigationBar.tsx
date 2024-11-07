import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  role?: string;
}

const navItems: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Book trip", href: "/farm ", role: "1" },
  { label: "Manage schedule", href: "/schedule ", role: "1" },
  { label: "Check fish", href: "/koi", role: "1" },
  { label: "Manage Quote", href: "/manageQuote", role: "2" },
  { label: "Manage Itinerary", href: "/manageItinerary", role: "3" },
  { label: "Admin", href: "/AdminUser", role: "8" },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const userRole = localStorage.getItem("userRole");

  const filteredNavItems = navItems.filter((item) =>
    item.role ? item.role === userRole : true
  );

  return (
    <nav className="bg-transparent text-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">
              Logo
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {filteredNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filteredNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
