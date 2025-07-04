'use client'
import { useAuth } from '@/Provider/AuthProvider';
import React from 'react';
import { useGetUserTrx } from './api/route';
import Loading from '../loading';

const UserTrxHistory = () => {
    const { user, logOut } = useAuth();
    const phone_number = user?.phone_number;
    const { data: history = [], isPending, error, isError } = useGetUserTrx({ phone_number: phone_number as string });
    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    }
    if (user?.accountType !== 'Agent' && user?.status !== 'Active') {
        return logOut();
    }
    return (
        <section className="border-2  md:max-w-xl mx-auto bg-popover-foreground md:p-5 md:rounded-md text-white">
            <head>
                <title>Fingo | Transaction History</title>
            </head>
            {/* Heading */}
            <div>
                <h2 className="text-center text-2xl font-bold">Transaction History</h2>
            </div>

            {/* Filter (Placeholder for Future Implementation) */}
            <div className="my-5">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full p-2 text-black rounded-md outline-none"
                />
            </div>

            {/* Transaction History List */}
            <div className="space-y-4">
                {/* Transaction Item (Demo Data) */}
                {history?.map((trx, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-gray-900 p-3 rounded-md shadow-md">
                        <div>
                            <p className="text-xs mb-1">TrxID: {trx.TrxID}</p>
                            <p className="text-sm">{new Date(trx.createdAt).toLocaleString()}</p>
                            <p className="font-semibold">{trx.method == 'Agent_cashIn' ? 'cash-In' : trx.method === 'Agent_cashOut' ? 'Cash Out' : undefined}</p>
                            {
                                trx.method === 'New_user_bonus' && <p>{trx.sender_name} ({trx.sender_phone_number})</p>
                            }
                            <p className="text-sm">{trx.sender_name} {trx.sender_phone_number}</p>
                        </div>
                        <div>

                            <p className={`font-semibold ${["Agent_cashIn"].includes(trx.method) ? "text-red-400" : "text-green-400"}`}>
                                {["Agent_cashOut", "Agent_cash_in", "New_user_bonus_receive"].includes(trx.method) ? "+" : "-"} {trx.amount} Taka
                            </p>
                            <p>income: {trx.agent_income}</p>
                            <p>Charge:{trx.charge}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>


    );
};

export default UserTrxHistory;