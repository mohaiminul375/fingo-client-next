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
            <head>
                <title>Fingo | Customer Dashboard</title>
            </head>
            <div className='grid grid-cols-2 md:grid-cols-3  gap-5'>
                <Link href='/send-money' className='flex flex-col justify-center items-center border-popover-foreground rounded-md  p-3 dark:bg-primary-foreground dark:text-white'>
                    <Image src={send_money} alt='send-money' height={40} width={40} />
                    <h2 className='text-base font-semibold'>Send Money</h2>
                </Link>
                {/* TODO: change icons */}
                {/* cash out */}
                <Link href='/cash-out' className='flex flex-col justify-center items-center border-popover-foreground rounded-md p-2 dark:bg-primary-foreground dark:text-white py-5 px-6'>
                    <Image src={cashOut} alt='send-money' height={40} width={40} />
                    <h2 className='text-base font-semibold'>cash out</h2>
                </Link>

                {/* TRx history */}
                <Link href='/transaction-history-user' className='flex flex-col justify-center items-center border-popover-foreground rounded-md dark:bg-primary-foreground dark:text-white p-3'>
                    <Image src={trx_history} alt='send-money' height={30} width={30} />
                    <h2 className='text-base font-semibold text-center'>Transaction <br />
                        History
                    </h2>
                </Link>
            </div>
        </section>
    );
};

export default UserMenu;