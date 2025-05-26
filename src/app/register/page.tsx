'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import logo from "../../../public/logo.png";
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateUser } from './api/route';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type Inputs = {
    name: string;
    phone_number: number;
    email: string;
    PIN: number;
    NID: string;
    avatar: string;
    accountType: string;
}
// Register page
const Register = () => {
    const router = useRouter()
    const createUser = useCreateUser();
    const [userType, setUserType] = useState("")
    const [images, setImages] = useState<ImageListType>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                } else {
                    reject(new Error("Failed to read file as base64"));
                }
            };

            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };
        });
    };

    const onSubmit: SubmitHandler<Inputs> = async (user_info) => {
        user_info.accountType = userType;

        if (images.length === 0 || !images[0]?.file) {
            toast.error("Image is required!");
            return;
        }

        const file = images[0].file;

        try {
            const base64Image = await readFileAsBase64(file);

            // Upload to ImgBB
            const { data: res } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`,
                { image: base64Image },
                { headers: { "content-type": "multipart/form-data" } }
            );

            const img_url = res?.data?.display_url;
            if (!img_url) {
                toast.error('Error from the image server. Please try again or contact the developer.');
                return;
            }

            user_info.avatar = img_url;

            // Create user
            const response = await createUser.mutateAsync(user_info);
            console.log(response);
            toast.success('Register successfully');
            router.push('/');
            reset();

        } catch (error) {
            console.error("Error during submission:", error);
            toast.error(error instanceof Error ? error.message : "An error occurred");
        }
    };


    // Handle image change
    const handleImageChange = (imageList: ImageListType) => {
        setImages(imageList);
    };
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
                <div className="mb-6 flex justify-center">
                    {images.length > 0 && (
                        <Image
                            height={80}
                            width={80}
                            src={images[0]?.data_url}
                            alt="preview"
                            className=" rounded-full"
                        />
                    )}
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
                            <Label htmlFor="nid">Profile Photo<span className='text-red-700 font-bold'>*</span></Label>
                            <ImageUploading

                                multiple
                                value={images}
                                onChange={handleImageChange}
                                dataURLKey="data_url"
                                acceptType={['jpg', 'png', 'jpeg']}

                            >
                                {({ onImageUpload, dragProps }) => (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="default"
                                            className="w-full"
                                            {...dragProps}
                                            onClick={onImageUpload}
                                        >
                                            Upload Image
                                        </Button>
                                    </div>
                                )}
                            </ImageUploading>
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
                    {/* row -5 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5 md:w-1/2">
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