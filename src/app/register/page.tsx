'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import logo from "../../../public/0452a43b-ab8b-411e-88f3-2c944d19b344.webp";
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateUser } from './api/route';

type Inputs = {
    name: string;
    phone_number: number;
    email: string;
    PIN: number;
    NID: string;
    userType: string;
}
const Register = () => {
    const createUser = useCreateUser();
    const [userType, setUserType] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        user_info.userType = userType;
        console.log(user_info)
        await createUser.mutateAsync(user_info);

    }

    // console.log(errors)
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
                <h2 className='text-center text-3xl font-bold'>Register</h2>
                {
                    errors.phone_number && <p className='text-center text-red-600 font-bold'>*Phone number me 11 characters only*</p>
                }
                {
                    errors.PIN && <p className='text-center text-red-600 font-bold'>*PIN number must be 5 characters and number only*</p>
                }
            </div>
            {/* Form content */}
            <div className='mt-5'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-white space-y-6'>
                    {/* row -1 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="text" id="name" placeholder="Your name"
                                className='text-white'
                                {...register('name')}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Mobile Number<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="tel" id="phone" placeholder="Enter your phone number"
                                {...register("phone_number", {
                                    pattern: /^[0-9]+$/,
                                    minLength: { value: 11, message: "phone number must be 11 characters" },
                                    maxLength: { value: 11, message: "phone number must be 11 characters" }
                                })}
                                required

                            />
                        </div>
                    </div>
                    {/* row -2 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="pin">Pin number<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" id="pin" placeholder="5 digit pin"
                                className='text-white'
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
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Enter your Email<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="email" id="email" placeholder="Enter your email address"
                                {...register('email')}
                                required
                            />
                        </div>
                    </div>
                    {/* row -3 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Account Type<span className='text-red-700 font-bold'>*</span></Label>
                            <Select
                                required
                                onValueChange={(value) => {
                                    setUserType(value)
                                }}
                            >
                                <SelectTrigger
                                    className="w-full">
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Agent">
                                            Agent
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="nid">NID<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" id="nid" placeholder="Enter your NID Number"
                                {...register('NID', {
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "NID must contain only numbers"
                                    }
                                })}
                                required
                            />
                        </div>
                    </div>
                    <div className=''>
                        <Button variant='secondary'>Register</Button>
                    </div>
                </form>
                <div className='mt-5 text-center font-bold'>
                    <h2> Already Have an account? <Link href='/login' className='underline text-[#d3d3d3]'>Login</Link> here</h2>
                </div>
            </div>
        </section>
    );
};

export default Register;