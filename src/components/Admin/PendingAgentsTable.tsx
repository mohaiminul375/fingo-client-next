import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useApprovedAgent } from '@/app/agent-approval/api/route';
interface Agent {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    userType: string,
    account_status: string | undefined;
    createdAt: string;
}
interface TableProps {
    idx: number;
    agent: Agent;
}
const PendingAgentsTable = ({ agent, idx }: TableProps) => {
    const approveAgent = useApprovedAgent();
    const { _id, name, phone_number, email, userType, account_status, createdAt } = agent;
    const handleApproveAgent = async (id: string) => {
        const newStatus = { account_status: 'Active' }
        await approveAgent.mutateAsync({ id, newStatus })

    }
    // const date =new Date(createdAt).tol;
    return (
        <TableRow className='text-center'>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">
                {_id} <br />{name}
            </TableCell>
            <TableCell>
                {phone_number} <br />{email}
            </TableCell>
            <TableCell>
                {userType} <br />{account_status}
            </TableCell>
            <TableCell>
                {new Date(createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => handleApproveAgent(_id)}
                    variant='secondary' className='text-xs p-3' >Approved</Button>
            </TableCell>

        </TableRow>
    );
};

export default PendingAgentsTable;