import Image from 'next/image';
import React from 'react';
import send_money from '../../../../public/trx_method/send-money.png';
import cashOut from '../../../../public/trx_method/cash-out.png';
import trx_history from '../../../../public/trx_method/transaction-history.png';
const UserMenu = () => {
    return (
        <section>
            <div className='grid md:grid-cols-3 gap-5'>
                <div className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center hover:border-2 hover:border-popover-foreground'>
                    <Image src={send_money} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Send Money</h2>
                </div>
                <div className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center'>
                    <Image src={cashOut} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Cash Out</h2>
                </div>
                <div className='flex flex-col justify-center items-center lg:w-40 p-5 rounded-md shadow-lg shadow-popover-foreground hover: text-popover-foreground hover:shadow-none transition-all duration-300 text-center'>
                    <Image src={trx_history} alt='send-money' height={50} width={50} />
                    <h2 className='text-lg font-semibold'>Transaction History</h2>
                </div>
            </div>
        </section>
    );
};

export default UserMenu;