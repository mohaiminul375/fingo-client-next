'use client'
import WebLogo from '@/components/Shared/WebLogo';
import React from 'react';
import { usePendingAgents } from './api/route';
import Loading from '../loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PendingAgentsTable from '@/components/Admin/PendingAgentsTable';
import { useAuth } from '@/Provider/AuthProvider';
// Agent Approval List
const AgentApproval = () => {
    const { user, logOut } = useAuth();

    const { data: agents, isPending, error, isError } = usePendingAgents();
    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    }
    if (user?.accountType !== 'Admin') {
        return logOut();
    }
    return (
        <section className="">
            <head>
                <title>Fingo | Agent Approval</title>
            </head>
            {/* Heading */}
            <div className="max-w-xl mx-auto text-center bg-popover-foreground text-white py-2 rounded-md">
                <WebLogo />
                <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                    Welcome to
                    Agent Approval Dashboard
                </h2>
                <p className="text-lg mb-6">
                    Agents are waiting for approval and start business.
                </p>
            </div>
            {/* table */}
            <div className='my-3'>
                <h2 className="text-xl font-bold">Total pending Agent: {agents?.length}</h2>
            </div>
            {/* Table */}
            <div className="mt-5 text-white bg-popover-foreground rounded-md p-5">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Id&Name</TableHead>
                            <TableHead>Phone Number & Email</TableHead>
                            <TableHead>UserType & Status</TableHead>
                            <TableHead>CreateAt</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Table Body */}
                    <TableBody>
                        {agents?.map((agent, idx) => (
                            <PendingAgentsTable
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

export default AgentApproval;