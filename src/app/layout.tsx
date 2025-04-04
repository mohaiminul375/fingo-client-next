'use client'
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from "@/Provider/AuthProvider";








const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Fingo",
//   description: "Generated by create next app",
// };
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:border-8 md:rounded-3xl md:border-[#4E4EC7] md:max-w-[500px] md:w-[500px]   mx-auto`}
      >
     
      
        <main className="md:border-8 md:min-w-[484px] md:rounded-3xl mx-auto border-black bg-white">

          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <main className="md:px-0 px-2 min-h-[calc(100vh-152px)] mt-10 rounded-3xl">

                {children}
              </main>
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
