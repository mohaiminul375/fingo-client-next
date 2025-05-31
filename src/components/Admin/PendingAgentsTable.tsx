import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useApprovedAgent } from '@/app/agent-approval/api/route';
import Swal from 'sweetalert2';
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
// Table row of Pending Agents table
const PendingAgentsTable = ({ agent, idx }: TableProps) => {
    const approveAgent = useApprovedAgent();
    const { _id, name, phone_number, email, userType, account_status, createdAt } = agent;
    // Handle function of Approve agent
    const handleApproveAgent = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Still want to Withdraw!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#003E78",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await approveAgent.mutateAsync(id)
            }
        });


    }
    //   row of table
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