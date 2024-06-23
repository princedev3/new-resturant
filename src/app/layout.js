import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProviders from "@/libs/SessionProviders";
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviders>
        <Notification/>
        < Navbar/>
        {children}
        <Footer/>
        <Toaster  position="bottom-right"/>
        </SessionProviders>
        </body>
    </html>
  );
}
