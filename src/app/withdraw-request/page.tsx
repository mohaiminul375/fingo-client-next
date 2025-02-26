'use client'
import WebLogo from '@/components/Shared/WebLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/Provider/AuthProvider';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useAgentWithdrawRequest } from './api/route';
// With Request from agent
const WithdrawReq = () => {
    const withdrawRequest = useAgentWithdrawRequest();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const handleWithdraw = (e) => {
        e.preventDefault()
        // balance must be 100 or more and cant requst more than earn
        const withdrawAmount = parseFloat(amount);
        if (withdrawAmount <= 99) {
            return toast.error('Amount must me 100 or more')
        } else if ((user?.current_balance ?? 0) < withdrawAmount) {
            return toast.error('Insufficient Balance');
        }
        console.log({ withdrawAmount })
        Swal.fire({
            title: "Are you sure?",
            text: "Still want to Withdraw!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#003E78",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newWithdraw = {
                    agent_name: user?.name,
                    agent_number: user?.phone_number,
                    withdrawAmount,
                }
                await withdrawRequest.mutateAsync(newWithdraw)

            }
        });
    }
    return (
        <section className='md:max-w-3xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-8 py-8'>
            <div className='space-y-5'>
                <WebLogo />
                <h2 className='text-center text-3xl font-bold'>Withdraw Request</h2>
            </div>
            {/*  Main Func*/}
            <div className='mt-5'>
                <form>
                    <div className='flex flex-col justify-between gap-5'>
                        {/* Amount */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Amount<span className='text-red-700 font-bold'>*</span></Label>
                            <Input type="number" placeholder="Enter amount want to cash out"
                                className='text-white'
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className=''>
                            <Button
                                onClick={handleWithdraw}
                                variant='secondary'>Send</Button>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default WithdrawReq;