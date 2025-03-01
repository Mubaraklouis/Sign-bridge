import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import Header from "@/layout/dashboard/header";
import Navigation from "@/layout/dashboard/navigation";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sign-Bridge",
  description:
    "Sign-Bridge is an  project that allows you to convert sign language to text and vice versa.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.20.0"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose@0.0.7"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@0.0.3"
          strategy="beforeInteractive"
        />
        {/* <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@0.0.3"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Navigation />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
