"use client";

import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot" ||
    pathname === "/otp" ||
    pathname === "/new-password" ||
    pathname === "/profile" ||
    pathname === "/add-vehicle" ||
    pathname === "/list-vehicle" ||
    pathname === "/vehicle-detail" ||
    pathname === "/subscription" ||
    pathname === "/forgot-otp" ||
    pathname === "/check-payment-status";

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {!isAuthPage && <Header />}
            {children}
            {!isAuthPage && <Footer />}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
//
