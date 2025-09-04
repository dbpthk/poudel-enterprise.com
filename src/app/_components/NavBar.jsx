"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, ShoppingCart, Search, X, ChevronDown } from "lucide-react";
import { useShopContext } from "../_context/ShopContext";

const Navbar = () => {
  const { search, setSearch, getCartCount } = useShopContext();
  const [inputValue, setInputValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const navItems = [
    { path: "/", label: "HOME", icon: "🏠" },
    { path: "/collection", label: "COLLECTION", icon: "🛍️" },
    { path: "/about", label: "ABOUT", icon: "ℹ️" },
    { path: "/contact", label: "CONTACT", icon: "📞" },
  ];

  const profileMenuItems = [
    { label: "My Profile", icon: "👤", path: "/profile" },
    { label: "Orders", icon: "📦", path: "/orders" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
    { label: "Logout", icon: "🚪", action: "logout" },
  ];

  console.log(getCartCount());
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileAction = (item) => {
    if (item.action === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      setProfileOpen(false);
    } else if (item.path) {
      // Navigate to path
      window.location.href = item.path;
      setProfileOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-xl" : "bg-transparent"
      }`}
    >
      {/* Top Banner */}
      <div className="hidden sm:flex w-full h-[30px] bg-gray-800 justify-center items-center gap-4 text-sm text-white font-medium">
        <p className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Free Click & Collect
        </p>
        <p className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          Free Shipping on orders over $100
        </p>
        <p className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          Free Returns
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="relative group">
            <Image
              src="/Plogo.png"
              alt="logo"
              width={70}
              height={70}
              className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group relative"
                >
                  <div className="relative flex flex-col items-center min-h-[56px] px-6 py-3 rounded-xl transition-all duration-300">
                    <span
                      className={`font-heading text-sm font-semibold w-[120px] text-center transition-colors ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </span>
                    <div
                      className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-4/5 bg-accent rounded-full transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            {pathname === "/collection" && (
              <div ref={searchRef} className="relative w-full sm:w-auto">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Search size={20} className="text-gray-600" />
                </button>
                {searchOpen && (
                  <div className="absolute -right-40 sm:right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[300px] z-50">
                    <div className="flex items-center gap-3 mb-3">
                      <Search size={20} className="text-gray-400" />
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSearch(inputValue);
                          }
                        }}
                        placeholder="Search products..."
                        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                        autoFocus
                      />
                    </div>
                    <div className="text-sm text-gray-500 text-center py-2">
                      Type to search products...
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <User
                  size={20}
                  className="text-gray-600 group-hover:text-gray-800 transition-colors"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 min-w-[220px] z-50 animate-in slide-in-from-top-2 duration-200">
                  {profileMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleProfileAction(item)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 text-left group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className="ml-auto text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href={"/cart"}>
              <button className="relative p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                <ShoppingCart
                  size={20}
                  className="text-gray-600 group-hover:text-gray-800 transition-colors"
                />
                <span className="absolute -top-2 -right-2 w-6 h-6 text-xs font-bold flex items-center justify-center text-white bg-gray-600 rounded-full shadow-lg animate-pulse">
                  {getCartCount()}
                </span>
              </button>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden z-50 ${
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
            <h3 className="font-heading text-xl font-bold text-gray-800">
              Menu
            </h3>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors hover:scale-110"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-gray-100 shadow-md" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`font-heading font-semibold ${
                        isActive ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Profile Section */}
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-2">
              {profileMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleProfileAction(item);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 text-left"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-gray-700">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
