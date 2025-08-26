import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Poudel Enterprise",
  description: "Poudel Enterprise - Your e-commerce platform",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
