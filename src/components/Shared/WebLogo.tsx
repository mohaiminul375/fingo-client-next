import Image from "next/image";
import logo from "../../../public/logo.png"
import { RiMenu2Fill } from "react-icons/ri";
const WebLogo = () => {
    return (
        <div className='flex items-center justify-center'>
            <Image src={logo} alt="site_logo" height={50} width={50} className="rounded-full" />
            <span className="ml-2 text-4xl italic font-extrabold text-white hidden lg:flex items-center">
                FingGo
                <RiMenu2Fill className="text-3xl mt-2" />
            </span>
        </div>
    );
};

export default WebLogo;