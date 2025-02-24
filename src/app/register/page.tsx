import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const Register = () => {
    return (
        <section className='md:max-w-5xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-5 py-8'>
            {/* Heading */}
            <div>
                <h2 className='text-center text-3xl font-bold'>Register</h2>
            </div>
            {/* Form content */}
            <div className='mt-5'>
                <form className='text-white space-y-6'>
                    {/* row -1 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Your name"
                                className='text-white'
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Mobile Number</Label>
                            <Input type="tel" id="phone" placeholder="Enter your phone number" />
                        </div>
                    </div>
                    {/* row -2 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="pin">Pin number</Label>
                            <Input type="pin" id="pin" placeholder="5 digit pin"
                                className='text-white'
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Enter your Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email address" />
                        </div>
                    </div>
                    {/* row -3 */}
                    <div className='flex flex-col md:flex-row justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Account Type</Label>
                            <Select>
                                <SelectTrigger className="w-full">
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
                            <Label htmlFor="nid">NID</Label>
                            <Input type="nid" id="nid" placeholder="Enter your NID Number" />
                        </div>
                    </div>
                    <div className=''>
                        <Button variant='secondary'>Register</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;