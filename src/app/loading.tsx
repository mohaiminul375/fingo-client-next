"use client";
import Image from "next/image";
import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import logo from "../../public/logo.png";
// Custom loading
const Loading = () => {
    return (
        <div className="min-h-[50vh] flex justify-center items-center bg-transparent">
            <span className="relative p-2 rounded-full w-fit bg-transparent">
                {/* Animated Border */}
                <span className="absolute inset-0  border-8 border-transparent animate-border rounded-full"></span>

                {/* Content */}
                <span className="relative flex items-center bg-popover-foreground p-2 rounded-lg">
                    <Image
                        src={logo}
                        alt="site_logo"
                        height={30}
                        width={30}
                        className="rounded-full"
                    />
                    <span className="ml-2 text-xl italic font-extrabold text-white hidden lg:inline-flex items-center">
                        FingGo
                        <RiMenu2Fill className="text-xl mt-2" />
                    </span>
                </span>
            </span>

            {/* Styles */}
            <style jsx>{`
        @keyframes borderAnimation {
          0% {
            border-color: #003E78;
          }
          50% {
            border-color: #003E78;
          }
          100% {
            border-color: #D3D3D3;
          }
        }

        .animate-border {
          animation: borderAnimation 2s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Loading;
