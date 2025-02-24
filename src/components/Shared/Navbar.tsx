'use client'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../public/0452a43b-ab8b-411e-88f3-2c944d19b344.webp";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiMenu2Fill } from "react-icons/ri";
// import { useUser } from "@/AuthProvider/UserContext";



export default function Navbar() {
    // const pathname = usePathname();
    // const { user, logOut, loading } = useUser();
    // console.log(user, loading)
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
            {/* Right Side content */}
            <div className="ml-auto flex items-center">
                <Link className="mx-2 text-white" href="/register">Register</Link>
                <Link href="/login">
                    <Button variant="destructive" className="rounded-full">Login</Button>
                </Link>
            </div>
            {/* Login/Register Buttons */}
            {/* {user ? (
                <div className="ml-auto flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.img} alt="avatar" />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user.user_name}</DropdownMenuLabel>
                            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                            <DropdownMenuLabel onClick={logOut}>LogOut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )} */}
        </header>


    );
}



