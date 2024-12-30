"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const getUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      };
      getUser();

      const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-800`}
      >
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Blog</h1>
            <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/posts" className="hover:underline">Posts</Link>
              </li>
            {user ? (
              <>
                <li>
                  <Link href="/posts/new" className="hover:underline">Create Post</Link>
                </li>
                <li className="font-bold">Logged in as: {user.email}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">{children}</main>

        <footer className="bg-gray-200 text-center py-4">
          <p>©2024</p>
        </footer>
      </body>
    </html>
  );
}
