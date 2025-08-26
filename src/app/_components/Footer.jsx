"use client";
import { useState } from "react";
import Image from "next/image";
import ScrollToTopButton from "./ScrollToTopButton";
import { toast } from "sonner";
import { contactInfo } from "../_config/contact";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const copyPhone = () => {
    navigator.clipboard.writeText(contactInfo.phone);
    toast.success("📞 Phone number copied!");
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    toast.success("📧 Email copied!");
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Image
                  src="/Plogo.png"
                  width={60}
                  height={60}
                  alt="Poudel Enterprises Logo"
                  className="mb-6 filter brightness-0 invert"
                />
                <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                  Welcome to Poudel Enterprises, your trusted destination for
                  quality products and exceptional service. We are committed to
                  providing innovative solutions and outstanding customer
                  experiences.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: "📱", label: "Phone", action: copyPhone },
                  { icon: "📧", label: "Email", action: copyEmail },
                ].map((social, index) =>
                  social.action ? (
                    <button
                      key={index}
                      onClick={social.action}
                      aria-label={social.label}
                      className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 cursor-pointer"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {social.label}
                      </span>
                    </button>
                  ) : null
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Quick Links
                </span>
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Collection", href: "/collection" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-white">Our Office</p>
                    <p className="text-gray-300 text-sm">
                      {contactInfo.address.street}
                      <br />
                      {contactInfo.address.suite}, {contactInfo.address.city},{" "}
                      {contactInfo.address.state}
                    </p>
                  </div>
                </div>

                <div
                  onClick={copyPhone}
                  className="flex items-start gap-3 cursor-pointer hover:opacity-80"
                >
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-gray-300 text-sm">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Poudel Enterprises - All rights reserved
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 float"></div>
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 float"
        style={{ animationDelay: "2s" }}
      ></div>

      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
