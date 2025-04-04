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
import { usePathname } from "next/navigation";








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
  const path = usePathname();
  console.log(path);
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className={`${path !== '/admin-dashboard' && 'md:rounded-3xl md:border-[#4E4EC7] md:border-8  md:max-w-[500px] md:w-[500px] '}  md:min-w-[484px] bg-white md:px-0 min-h-[calc(100vh-152px)]   mx-auto`}>
          <div className={`${path !== '/admin-dashboard' && "md:border-black md:border-8 rounded-2xl min-h-[calc(100vh-152px)]"}`}> {/*for black border */}
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Navbar />
                <main className={`mt-10 min-h-[calc(100vh-120px)]  ${path !== '/admin-dashboard' && 'md:min-h-[calc(100vh-152px)]'}`}>
                  {children}
                </main>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </AuthProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
