import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Work_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import {authOptions} from "@/lib/auth";
import {SessionProvider} from "next-auth/react";
import AuthContext from "@/app/AuthContext";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpotiSync",
  description: "Alternative for the Spotify Jam, which doesn't require a premium account.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthContext>
        <html lang="en">
        <body
            className={`${workSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    </AuthContext>
  );
}
