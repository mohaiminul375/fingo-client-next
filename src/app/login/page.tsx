'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import logo from "../../../public/0452a43b-ab8b-411e-88f3-2c944d19b344.webp"
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserLogin } from './api/route';
type Inputs = {
    name: string;
    phone_number: number;
    emailOrPhone: string;
    PIN: number;
    NID: string;
    userType: string;
}
const Login = () => {
    const userLogin = useUserLogin();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        console.log(user_info);
        await userLogin.mutateAsync(user_info);
    }

    return (
        <section className='md:max-w-5xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-5 py-8'>
            {/* Heading */}
            <div className='space-y-5'>
                <div className='flex items-center justify-center'>
                    <Image src={logo} alt="site_logo" height={50} width={50} className="rounded-full" />
                    <span className="ml-2 text-4xl italic font-extrabold text-white hidden lg:flex items-center">
                        FingGo
                        <RiMenu2Fill className="text-3xl mt-2" />
                    </span>
                </div>
                <h2 className='text-center text-3xl font-bold'>Login</h2>
                {
                    errors?.PIN && <p className='text-center my-4 font-bold text-red-600'>*Pin Must be 5 digit*</p>
                }
            </div>
            {/* Form content */}
            <div className='mt-5'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-white space-y-6'>
                    {/* row -1 */}
                    <div className='flex flex-col justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Email/Phone Number <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" placeholder="Your phone number or email address"
                                className='text-white'
                                {...register('emailOrPhone')}
                            />
                        </div>
                        {/* Password Field */}
                        < div className='grid w-full items-center gap-1.5' >
                            <Label htmlFor="password">PIN<span className='text-red-700 font-bold'>*</span></Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your 5 digit pin"
                                    className="pr-10"
                                    required
                                    {...register("PIN", {
                                        pattern: /^[0-9]+$/,
                                        minLength: {
                                            value: 5,
                                            message: "PIN must be exactly 5 digits"
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "PIN must be exactly 5 digits"
                                        }
                                    })}
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div >

                    </div>
                    <div className=''>
                        <Button variant='secondary'>Login</Button>
                    </div>
                </form>
                <div className='mt-5 text-center font-bold'>
                    <h2>New in FingGo? <Link href='/register' className='underline text-[#d3d3d3]'>Register</Link> here</h2>
                </div>
            </div>
        </section>
    );
};

export default Login;