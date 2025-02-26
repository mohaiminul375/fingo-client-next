'use client'
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../public/logo.png";
// import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiMenu2Fill } from "react-icons/ri";
import { useAuth } from "@/Provider/AuthProvider";
import { useState } from "react";
// import { useUser } from "@/AuthProvider/UserContext";


export default function Navbar() {
    const [showBalance, setShowBalance] = useState(false);

    // const pathname = usePathname();
    const { user, logOut, loading } = useAuth();
    console.log(user, loading)
    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-xl border-b-2 bg-popover-foreground ">
            <Link href="/" className="flex items-center">
                <Image src={logo} alt="site_logo" height={50} width={50} className="rounded-full" />
                <span className="ml-2 text-4xl italic font-extrabold text-white hidden lg:flex items-center">
                    FingGo
                    <RiMenu2Fill className="text-3xl mt-2" />
                </span>
                <span className="lg:hidden text-white text-3xl font-bold">
                    <RiMenu2Fill />
                </span>
            </Link>
            {/* Login/Register Buttons */}
            {user ? (
                <>
                    <div className="ml-auto flex items-center">
                        {/* Balance toggle */}
                        <div
                            className="relative flex items-center m-10 h-14 rounded-full bg-white cursor-pointer px-5 transition-all duration-300"
                            onClick={() => setShowBalance(!showBalance)}
                        >
                            {/* Taka symbol + Check Balance (Initially Visible) */}
                            <span
                                className={`text-lg font-medium transition-all duration-300 ${showBalance ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}
                            >
                                ৳ Check Balance
                            </span>

                            {/* Balance & Income (Initially Hidden, Shown on Click) */}
                            <div className={`flex flex-col ml-3 transition-all duration-300 ${showBalance ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                                <span className="text-lg font-medium">Balance: {user.current_balance} ৳</span>
                                {
                                    user?.userType !== 'User' && <span className="text-sm text-gray-600">Income: {user?.total_income} ৳</span>
                                }

                            </div>
                        </div>
                        {/*  */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src='https://i.ibb.co.com/RbY8vby/avatar.png' alt="avatar" />
                                    <AvatarFallback />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                                <DropdownMenuLabel onClick={logOut}>LogOut</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}
        </header>


    );
}



