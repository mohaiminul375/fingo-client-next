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
import { useCompleteCashIn, useVerifyCashIn } from './api/route';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import cashIn from '../../../public/trx_method/cash-in.png'
import Image from 'next/image';
import { AxiosError } from 'axios';
// TODO: cashIn error
type Inputs = {
    name: string;
    user_phone_number: string;
    PIN: string;
    trx_amount: number;
    agent_name: string | undefined;
    agent_phone_number: string | undefined;
    method: string;
}
interface VerifyObj {
    agent_name: string;
    agent_phone_number: string;
    user_phone_number: string;
    user_name: string;
    amount: number;
}
interface ApiErrorResponse {
    message?: string;
}
// Cah In Page
const CashIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const verifyCashIn = useVerifyCashIn();
    const completeCashIn = useCompleteCashIn();
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isVerified, setIsVerified] = useState<VerifyObj | null>(null);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<Inputs> = async (cashIn) => {
        if (!user?.name && !user?.phone_number) {
            return toast.error('Agent name and phone number not found');
        }
        cashIn.method = 'cashIn';
        cashIn.agent_name = user?.name;
        cashIn.agent_phone_number = user?.phone_number;
        // Verify cash In
        const res = await verifyCashIn.mutateAsync(cashIn);
        try {

            if (res?.verifiedTransaction) {
                setIsVerified(res.verifiedTransaction);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const existedError = axiosError?.response?.data?.message;
            if (existedError) {
                toast.error(existedError)
            }
            const netWorkError = (error as Error)?.message || "Failed Verify!"
            toast.error(netWorkError)
        }
    };
    // Handle button animation and complete cash in
    const handleCompleteCashIn = async () => {
        setBtnDisabled(true)
        setIsLoading(true);
        if (!isVerified) {
            return toast.error('failed to get data')
        }

        setTimeout(() => {
            setIsLoading(false);
            setIsVerified(null)
            setBtnDisabled(false)
        }, 3000);
        const res = await completeCashIn.mutateAsync(isVerified);
        console.log(res);

    };
    return (
        <>
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
                                    {...register("user_phone_number", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Invalid phone number",
                                        },
                                        minLength: { value: 11, message: "Phone number must be 11 characters" },
                                        maxLength: { value: 11, message: "Phone number must be 11 characters" }
                                    })}
                                />
                                {errors.user_phone_number && <p className="text-red-500">{errors.user_phone_number.message}</p>}
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

            {/* Modal Triggered After Successful Cash In */}
            {isVerified && (
                <Dialog open={true} onOpenChange={() => setIsVerified(null)}>
                    <DialogContent className="md:max-w-xl w-full bg-popover-foreground text-white p-6 rounded-lg shadow-lg">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-2xl font-bold text-emerald-500">Cash In Summary</DialogTitle>
                            <DialogDescription className="mt-2 text-sm text-gray-400">
                                Please verify the details before confirming the transaction.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Sender Information */}
                        <div className="mt-0">
                            <h3 className="text-lg font-semibold text-emerald-400">Sender Information</h3>
                            <div className="mt-2 space-y-2">
                                <p className="text-base font-medium"><strong>Agent Name:</strong> {isVerified?.agent_name || 'Not Found'}</p>
                                <p className="text-sm text-gray-300"><strong>Agent Phone:</strong> {isVerified?.agent_phone_number || 'Not Found'}</p>
                            </div>
                            <hr className="my-2 border-gray-600" />
                        </div>

                        {/* Receiver Information */}
                        <div className="mt-0">
                            <h3 className="text-lg font-semibold text-emerald-400">Receiver Information</h3>
                            <div className="mt-2 space-y-2">
                                <p className="text-base font-medium"><strong>Receiver Name:</strong> {isVerified?.user_name || 'Not Found'}</p>
                                <p className="text-sm text-gray-300"><strong>Receiver Phone:</strong> {isVerified?.user_phone_number || 'Not Found'}</p>
                            </div>
                            <hr className="my-2 border-gray-600" />
                        </div>

                        {/* Amount Information */}
                        <div className="mt-0">
                            <h3 className="text-lg font-semibold text-emerald-400">Amount Information</h3>
                            <div className="mt-2 space-y-2">
                                <p className="text-base font-medium"><strong>Amount:</strong> {isVerified?.amount || 'Not Found'} Taka</p>
                                <p className="text-sm text-gray-300"><strong>Charge:</strong> 0 Taka</p>
                                <p className="text-base font-medium">
                                    <strong>Remain Balance: </strong>
                                    {user?.current_balance !== undefined
                                        ? user.current_balance - isVerified.amount
                                        : 'Not Found'} Taka
                                </p>
                            </div>
                        </div>
                        <DialogFooter className="mt-2 flex justify-center w-full">
                            <div
                                aria-disabled={btnDisabled}
                                className={`relative flex items-center justify-center p-5 py-5 rounded-full bg-[#d3d3d3] mx-auto overflow-hidden ${btnDisabled && 'cursor-not-allowed opacity-50'}`}
                                onClick={btnDisabled ? undefined : handleCompleteCashIn}
                            >
                                {/* Rotating circle when loading */}
                                {isLoading && (
                                    <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"></div>
                                )}
                                <Image className='mx-auto' src={cashIn} alt="cashIn-icon" height={50} width={50} />
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default CashIn;
