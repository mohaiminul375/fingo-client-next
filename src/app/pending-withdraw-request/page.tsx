'use client'
import WebLogo from "@/components/Shared/WebLogo";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePendingCashReq } from "./api/route";
import Loading from "../loading";
import WithdrawTable from "@/components/Admin/WithdrawTableAdmin";

// Pending Cash Req list
const PendingWithdrawReq = () => {

    const { data: agents = [], isPending, error, isError } = usePendingCashReq();
    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    }
    return (
        <section className="">
            {/* Heading */}
            <div className="max-w-xl mx-auto text-center bg-popover-foreground text-white py-2 rounded-md">
                <WebLogo />
                <h2 className="text-xl md:text-3xl font-bold leading-tight mb-4">
                    Welcome to Agent's Cash Request
                </h2>
                <p className="text-lg mb-6">
                    Agent's Are waiting for approval for stars new transaction
                </p>
            </div>
            {/* filter */}
            <div>

            </div>
            {/* table */}

            <div>
                <h2 className="text-xl font-bold">Total Request:{agents?.length}</h2>
            </div>
            <div className="mt-5 text-white bg-popover-foreground rounded-md p-5">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Phone Number & Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>RequestedAt</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Table Body */}
                    <TableBody>
                        {agents?.map((agent, idx) => (
                            <WithdrawTable
                                key={agent._id}
                                agent={agent}
                                idx={idx}
                            />


                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>

    );
};

export default PendingWithdrawReq;