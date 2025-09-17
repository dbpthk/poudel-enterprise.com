import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import Provider from "./Provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import ourFileRouter from "./_config/uploadthing";
import FetchProducts from "./_components/FetchProducts";

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
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png" }, // fallback
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`scrollSmooth ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <FetchProducts>
            <NavBar />
            {children}
            <Toaster richColors position="top-right" />
            <Footer />
            <ScrollToTopButton />
          </FetchProducts>
        </Provider>
      </body>
    </html>
  );
}
