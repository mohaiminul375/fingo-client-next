import Image from 'next/image';
import React from 'react';
import cashIn from '../../../../public/trx_method/cash-in.png';
import cashReq from '../../../../public/trx_method/cash-req.png';
import withdrawReq from '../../../../public/trx_method/cash-withdrawal.png';
import trx_history from '../../../../public/trx_method/transaction-history.png';
import Link from 'next/link';
// Menu for agent
const AgentMenu = () => {
    return (
        <section className='md:max-w-2xl mx-auto'>
            <head>
                <title>Fingo | Agent Dashboard</title>
            </head>
            <div className='grid grid-cols-3 md:grid-cols-4 gap-3'>
                <Link href='/cash-in' className='flex flex-col justify-center items-center dark:bg-primary p-2 rounded-md'>
                    <Image src={cashIn} alt='send-money' height={50} width={50} />
                    <h2 className='text-base dark:text-black font-semibold'>Cash In</h2>
                </Link>
                {/* cash out */}
                <Link href='/cash-request' className='flex flex-col justify-center items-center dark:bg-primary p-2 rounded-md'>
                    <Image src={cashReq} alt='send-money' height={50} width={50} />
                    <h2 className='text-base font-semibold dark:text-black text-center'>Cash Request</h2>
                </Link>
                <Link href='/withdraw-request' className='flex flex-col justify-center items-center dark:bg-primary p-2 rounded-md' >
                    <Image src={withdrawReq} alt='send-money' height={50} width={50} />
                    <h2 className='text-base font-semibold dark:text-black text-center'>Withdraw Request</h2>
                </Link>
                <Link href='/transaction-history-agent' className='flex flex-col justify-center items-center dark:bg-primary p-2 rounded-md'>
                    <Image src={trx_history} alt='send-money' height={50} width={50} />
                    <h2 className='text-base font-semibold dark:text-black text-center'>Transaction History</h2>
                </Link>
            </div>
        </section>
    );
};

export default AgentMenu;