import Image from 'next/image';
import React from 'react';
import send_money from '../../../../public/trx_method/send-money.png';
import cashOut from '../../../../public/trx_method/cash-out.png';
import trx_history from '../../../../public/trx_method/transaction-history.png';
import Link from 'next/link';
//menu for User
const UserMenu = () => {
    return (
        <section className='md:max-w-2xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                <Link href='/send-money' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={send_money} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Send Money</h2>
                </Link>
                {/* cash out */}
                <Link href='/cash-out' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={cashOut} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Cash Out</h2>
                </Link>
                {/* trx history */}
                <Link href='/transaction-history-user' className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={trx_history} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Transaction History</h2>
                </Link>
            </div>
        </section>
    );
};

export default UserMenu;