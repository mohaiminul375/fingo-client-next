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
    if (user?.userType !== 'User' && user?.userType !== "Active") {
        return logOut();
    }
    return (
        <section className="border-2  md:max-w-xl mx-auto bg-popover-foreground md:p-5 md:rounded-md text-white">
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
                            <p className="font-semibold">{trx.method}</p>
                            {
                                trx.method === 'user_send_money' && <p>{trx.receiver_name} ({trx.receiver_phone_number})</p>
                            }
                            {
                                trx.method === 'user_received_money' && <p>{trx.sender_name} ({trx.sender_phone_number})</p>
                            }
                            {
                                trx.method === 'Agent_cash_in' && <p>{trx.agent_name} ({trx.agent_phone_number})</p>
                            }
                            {
                                trx.method === 'Agent_Cash_Out' && <p>{trx.agent_name} ({trx.agent_phone_number})</p>
                            }
                            {
                                trx.method === 'New_user_bonus_receive' && <p>{trx.sender_name} ({trx.sender_phone_number})</p>
                            }

                        </div>
                        <p className={`font-semibold ${["user_received_money", "Agent_cash_in", "New_user_bonus_receive"].includes(trx.method) ? "text-green-400" : "text-red-400"}`}>
                            {["user_received_money", "Agent_cash_in", "New_user_bonus_receive"].includes(trx.method) ? "+" : "-"} {trx.amount} Taka
                        </p>


                    </div>
                ))}
            </div>
        </section>


    );
};

export default UserTrxHistory;