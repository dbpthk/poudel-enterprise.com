"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, ShoppingCart, Search, X } from "lucide-react";
import { useShopContext } from "../_context/ShopContext";
import { useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { search, setSearch, cartCount } = useShopContext();
  const [inputValue, setInputValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { user, isLoaded } = useUser();

  const navItems = [
    { path: "/", label: "HOME", icon: "🏠" },
    { path: "/collection", label: "COLLECTION", icon: "🛍️" },
    { path: "/about", label: "ABOUT", icon: "ℹ️" },
    { path: "/contact", label: "CONTACT", icon: "📞" },
  ];

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
              priority
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
                  prefetch={true}
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
                      className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-3/5 bg-accent rounded-full transition-all duration-300 ${
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
            <div className="flex flex-row gap-5 min-h-[56px]">
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`hidden lg:inline p-2 cursor-pointer rounded-xl ${
                    !user ? "bg-white/80 backdrop-blur-sm " : ""
                  } hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 group flex flex-row gap-2`}
                >
                  {!isLoaded ? (
                    // LOADING STATE
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-400" />
                  ) : user ? (
                    // LOGGED-IN STATE
                    <div className="flex flex-row items-center gap-2 text-sm font-medium">
                      Account
                      <UserButton>
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label="View Orders"
                            labelIcon="📦"
                            href="/orders"
                          />
                          {/* ADMIN LINK ONLY FOR ADMINS */}
                          {user?.publicMetadata?.role === "admin" && (
                            <UserButton.Link
                              label="Admin"
                              labelIcon="🛠️"
                              href="/admin"
                            />
                          )}
                        </UserButton.MenuItems>
                      </UserButton>
                    </div>
                  ) : (
                    // GUEST STATE
                    <div className="text-sm font-medium flex flex-row gap-2">
                      <User
                        size={20}
                        className="text-gray-600 group-hover:text-gray-800 transition-colors"
                      />
                      Sign in / Join
                    </div>
                  )}
                </button>

                {profileOpen && isLoaded && !user && (
                  <div className="absolute right-0  top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 min-w-[220px] z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col sm:flex-row items-center text-sm font-medium">
                      <Link
                        href={"/sign-in"}
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 transition-all duration-200 text-left group "
                      >
                        <span className="text-md">👤</span>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          Sign In
                        </span>
                      </Link>
                      <p>|</p>
                      <Link
                        href={"/sign-up"}
                        onClick={() => setProfileOpen(false)}
                        className="w-full p-2 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 transition-all duration-200 text-left group "
                      >
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          Join
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href={"/cart"} prefetch={true}>
                <button className="relative p-3 rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <ShoppingCart
                    size={20}
                    className="text-gray-600 group-hover:text-gray-800 transition-colors"
                  />
                  <span
                    className={`absolute -top-2 -right-2 w-6 h-6 text-xs font-bold flex items-center justify-center text-white ${
                      cartCount > 0 &&
                      "bg-accent rounded-full shadow-lg animate-pulse"
                    }
                  `}
                  >
                    {cartCount > 0 && cartCount}
                  </span>
                </button>
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <Menu size={25} className="text-gray-600 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed z-50 inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
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
              <X className="w-6 h-6 text-gray-600 cursor-pointer" />
            </button>
          </div>

          <nav className="p-6 space-y-2 bg-white">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  prefetch
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className={`flex items-center gap-4 mb-2 px-4 py-4 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-gray-100 shadow-md" : "hover:bg-gray-100"
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

          <div className=" bg-white border-t-1 border-gray-300 h-screen">
            {isLoaded && user ? (
              <div className="flex flex-col font-medium text-lg gap-4 mb-2 px-6 py-6 rounded-xl transition-all duration-200 w-full ">
                <Link
                  href="/orders"
                  className={`flex gap-4 px-4 py-4 rounded-xl not-only:transition-all duration-200 ${
                    pathname === "/orders"
                      ? "bg-gray-100 shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xl">📦</span>
                  <span className="text-lg font-medium">View Orders</span>
                </Link>

                <div className="flex gap-4 px-4 py-4">
                  Account <UserButton />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-6">
                <Link
                  className={`flex gap-4 px-4 py-4 transition-all duration-200 ${
                    pathname === "/sign-in" ? "bg-gray-100 shadow-md" : ""
                  }`}
                  href={"/sign-in"}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-lg font-medium">👤</span>
                  <span className="text-lg font-medium">Sign In</span>
                </Link>
                <Link
                  className={`flex gap-4 px-4 py-4 transition-all duration-200 ${
                    pathname === "/sign-up" ? "bg-gray-100 shadow-md" : ""
                  }`}
                  href={"/sign-up"}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-lg font-medium">👤</span>
                  <span className="text-lg font-medium">Join</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
