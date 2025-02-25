import WebLogo from "@/components/Shared/WebLogo";
import { Button } from "@/components/ui/button";

const cashReq = () => {
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
                        <Button variant='secondary'>Send Cash Request</Button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default cashReq;