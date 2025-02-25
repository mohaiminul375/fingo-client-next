'use client'
import WebLogo from '@/components/Shared/WebLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/Provider/AuthProvider';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useVerifyCashIn } from './api/route';

type Inputs = {
    name: string;
    receiver_phone_number: string;  // Changed to string to match validation
    PIN: string;
    trx_amount: number;
    agent_name: string | undefined;
    agent_phone_number: string | undefined;
    method: string;
}

const CashIn = () => {
    const verifyCashIn = useVerifyCashIn();
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        mode: "onChange", // Ensures validation is checked on every change
    });

    const onSubmit: SubmitHandler<Inputs> = async (cashIn) => {
        if (!user?.name && !user?.phone_number) {
            return toast.error('agent name and phone number not found')
        }
        cashIn.method = 'cashIn'
        cashIn.agent_name = user?.name;
        cashIn.agent_phone_number = user?.phone_number;
        console.log(cashIn)
        const res = await verifyCashIn.mutateAsync(cashIn)
        console.log(res);
    };

    return (
        <section className='md:max-w-3xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-8 py-8'>
            <div className='space-y-5'>
                <WebLogo />
                <h2 className='text-center text-3xl font-bold'>Cash In</h2>
            </div>

            {/* Main Form */}
            <div className='mt-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col justify-between gap-5'>

                        {/* Phone Number */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Customer Phone Number <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="tel" placeholder="Enter your phone number"
                                {...register("receiver_phone_number", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Invalid phone number",
                                    },
                                    minLength: { value: 11, message: "Phone number must be 11 characters" },
                                    maxLength: { value: 11, message: "Phone number must be 11 characters" }
                                })}
                            />
                            {errors.receiver_phone_number && <p className="text-red-500">{errors.receiver_phone_number.message}</p>}
                        </div>

                        {/* Amount */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Amount <span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" placeholder="Enter amount to cash in"
                                {...register('trx_amount', {
                                    required: "Amount is required",
                                    min: { value: 1, message: "Amount must be greater than 0" }
                                })}
                            />
                            {errors.trx_amount && <p className="text-red-500">{errors.trx_amount.message}</p>}
                        </div>

                        {/* PIN Field */}
                        <div className='grid w-full items-center gap-1.5'>
                            <Label htmlFor="password">PIN <span className='text-red-700 font-bold'>*</span></Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your 5-digit PIN"
                                    {...register("PIN", {
                                        required: "PIN is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "PIN must contain only numbers"
                                        },
                                        minLength: { value: 5, message: "PIN must be exactly 5 digits" },
                                        maxLength: { value: 5, message: "PIN must be exactly 5 digits" }
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
                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.PIN && <p className="text-red-500">{errors.PIN.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className=''>
                            <Button variant='secondary' type="submit" disabled={!isValid}>
                                Cash In
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CashIn;
