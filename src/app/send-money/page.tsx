'use client'
import WebLogo from '@/components/Shared/WebLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

const SendMoney = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className='md:max-w-3xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-8 py-8'>
            <div className='space-y-5'>
                <WebLogo />
                <h2 className='text-center text-3xl font-bold'>Send Money</h2>
            </div>
            {/*  Main Func*/}
            <div className='mt-5'>
                <form>
                    <div className='flex flex-col justify-between gap-5'>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Receiver Phone Number<span className='text-red-700 font-bold'>*</span></Label>
                            <Input inputMode='numeric' type="numeric" pattern='[0-9]*' placeholder="Enter receiver phone number"
                                className='text-white'
                            // {...register('emailOrPhone')}
                            />
                        </div>
                        {/* Amount */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Amount<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" placeholder="Enter amount want to send"
                                className='text-white'
                            // {...register('emailOrPhone')}
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
                                // {...register("PIN", {
                                //     pattern: /^[0-9]+$/,
                                //     minLength: {
                                //         value: 5,
                                //         message: "PIN must be exactly 5 digits"
                                //     },
                                //     maxLength: {
                                //         value: 5,
                                //         message: "PIN must be exactly 5 digits"
                                //     }
                                // })}
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
                        <div className=''>
                            <Button variant='secondary'>Send</Button>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default SendMoney;