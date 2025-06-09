import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import Swal from 'sweetalert2';
import { useApproveCashReq } from '@/app/pending-cash-request/api/route';

interface User {
    _id: string,
    agent_name: string,
    agent_phone_number: string,
    request_amount: number,
    status: string,
    account_status: string;
    createdAt: string;
}
interface TableProps {
    idx: number;
    agent: User;
}
// Table of pending cash request admin page
const CashRequestTable = ({ agent, idx }: TableProps) => {
    const approveReq = useApproveCashReq();
    const { _id, agent_name, agent_phone_number, request_amount, status, createdAt } = agent;
    // const date =new Date(createdAt).tol;
    // handle cash request approved
    const handleCashRequestApprove = () => {
        const newReq = {
            _id, agent_name, agent_phone_number, request_amount, status, createdAt
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Still want to Approve",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#003E78",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await approveReq.mutateAsync(newReq)

            }
        });
    }
    return (
        <TableRow className='text-center'>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{_id}</TableCell>
            <TableCell className="font-medium">
                {agent_phone_number} <br />{agent_name}
            </TableCell>
            <TableCell>
                {status}
            </TableCell>
            <TableCell>
                {new Date(createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
                {request_amount}
            </TableCell>
            <TableCell>
                <Button onClick={handleCashRequestApprove} className='text-base p-1' variant='secondary'>Approved</Button>
            </TableCell>
        </TableRow>
    );
};

export default CashRequestTable;