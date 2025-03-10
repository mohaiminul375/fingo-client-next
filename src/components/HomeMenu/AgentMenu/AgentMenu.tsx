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
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                <Link href='/cash-in' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={cashIn} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Cash In</h2>
                </Link>
                {/* cash out */}
                <Link href='/cash-request' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={cashReq} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Cash Request</h2>
                </Link>
                <Link href='/withdraw-request' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground  hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={withdrawReq} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Withdraw Request</h2>
                </Link>
                <Link href='/transaction-history-agent' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground  hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={trx_history} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Transaction History</h2>
                </Link>
            </div>
        </section>
    );
};

export default AgentMenu;