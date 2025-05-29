'use client'
import WebLogo from "@/components/Shared/WebLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from 'sweetalert2'
import { useAgentCashRequest } from "./api/route";
import toast from "react-hot-toast";
// Send Cash Request to Admin
const CashReq = () => {
    const { user, logOut } = useAuth();
    const cashRequest = useAgentCashRequest();
    // Request Function
    const handleMoneyRequest = async () => {
        if (!user?.name && !user?.phone_number) {
            return toast.error('failed to get Agent info')
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Still want to send Request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#003E78",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newReq = {
                    agent_name: user?.name,
                    agent_number: user?.phone_number
                }
                await cashRequest.mutateAsync(newReq)

            }
        });

    }
    if (user?.accountType !== 'Agent' && user?.account_status !== 'Active') {
        return logOut();
    }
    return (
        <section className='md:max-w-3xl mx-auto border-2 border-popover-foreground bg-popover-foreground text-white rounded-md p-8 py-8'>
            <div className='space-y-5'>
                <WebLogo />
                <h2 className='text-center text-3xl font-bold'>Cash Request</h2>
            </div>
            {/*  Main Func*/}
            <div className="mt-5 space-y-3 p-4 border rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold">Request for Money</h2>
                <p className="text-lg">
                    You are requesting <span className="font-bold italic">৳1,00,000</span> from the authority. After approve it will added your account and you can transaction with customer.
                </p>
                <div>
                    <div className=''>
                        <Button
                            onClick={handleMoneyRequest}
                            variant='secondary'>Send Cash Request</Button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default CashReq;