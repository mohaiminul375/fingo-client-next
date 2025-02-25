import Image from 'next/image';
import React from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import logo from "../../../public/0452a43b-ab8b-411e-88f3-2c944d19b344.webp"
const page = () => {
    return (
        <div className="min-h-[50vh] flex justify-center items-center border-2 border-red-600">
            <span className="inline-flex items-center bg-popover-foreground p-2 rounded-lg w-fit border-8">
                <Image src={logo} alt="site_logo" height={50} width={50} className="rounded-full" />
                <span className="ml-2 text-4xl italic font-extrabold text-white hidden lg:inline-flex items-center">
                    FingGo
                    <RiMenu2Fill className="text-3xl mt-2" />
                </span>
            </span>
        </div>

    );
};

export default page;