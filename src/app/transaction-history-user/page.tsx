'use client'
import { useAuth } from '@/Provider/AuthProvider';
import React from 'react';
import { useGetUserTrx } from './api/route';
import Loading from '../loading';

const UserTrxHistory = () => {
    const { user } = useAuth();
    const phone_number = user?.phone_number;
    const { data: history = [], isPending, error, isError } = useGetUserTrx({ phone_number });
    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    }

    return (
        <section className="border-2 border-red-800 md:max-w-xl mx-auto bg-popover-foreground md:p-5 md:rounded-md text-white">
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
                            <p className="text-xs">ID: {trx.trx_id}</p>
                            <p className="text-sm">{new Date(trx.createdAt).toLocaleString()}</p>
                            <p className="font-semibold">{trx.method}</p>
                            {
                                trx.method === 'cashOut' && <p>{trx.agent_name} ({trx.agent_phone_number})</p>
                            }
                            {
                                trx.method === 'cashIn' && <p>{trx.agent_name} ({trx.agent_phone_number})</p>
                            }
                            {
                                trx.method === 'sendMoney' && <p>{trx.receiver_name} ({trx.receiver_phone_number})</p>
                            }
                            {/* <p className="text-sm">{trx.sender_name || trx.receiver_name || trx.agent_name} ({trx.sender_phone_number || trx.receiver_phone_number || trx.agent_phone_number})</p> */}
                        </div>
                        <p className="font-semibold text-green-400">{trx.amount} Taka</p>
                    </div>
                ))}
            </div>
        </section>


    );
};

export default UserTrxHistory;