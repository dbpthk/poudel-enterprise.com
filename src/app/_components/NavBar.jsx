"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "HOME", icon: "🏠" },
    { path: "/collection", label: "COLLECTION", icon: "🛍️" },
    { path: "/about", label: "ABOUT", icon: "ℹ️" },
    { path: "/contact", label: "CONTACT", icon: "📞" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative group px-6 py-3 rounded-xl transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-white/80 shadow-lg"
                    : "hover:bg-white/80 hover:shadow-lg"
                }`}
              >
                <span className="font-heading text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-4/5"></div>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {pathname === "/collection" && (
              <button className="p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
                <Search size={20} />
              </button>
            )}

            {/* Profile */}
            <Link href="/login">
              <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
                <User size={20} />
              </div>
            </Link>

            {/* Cart */}
            <button className="relative p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 w-5 h-5 text-xs font-bold flex items-center justify-center text-white bg-red-500 rounded-full">
                0
              </span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="font-heading text-xl font-bold">Menu</h3>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="p-6 space-y-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-heading font-semibold text-gray-700">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Need help?</p>
              <button className="btn-primary w-full">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
