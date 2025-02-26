import React from 'react';
import { TableCell, TableRow } from '../ui/table';
interface User {
    _id: string,
    agent_name: string,
    agent_phone_number: string,
    request_amount: number,
    status: string,
    account_status: string;
    requestedAt: string;
}
interface TableProps {
    idx: number;
    agent: User;
}
// Table of pending cash request admin page
const CashRequestTable = ({ agent, idx }: TableProps) => {
    const { _id, agent_name, agent_phone_number, request_amount, status, requestedAt } = agent;
    // const date =new Date(createdAt).tol;
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
                {new Date(requestedAt).toLocaleString()}
            </TableCell>
            <TableCell>
                {request_amount}
            </TableCell>
            <TableCell>

            </TableCell>
            {/* <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="md:max-w-6xl">
                            <DialogHeader className="text-white">
                                <DialogTitle>Edit Lesson</DialogTitle>
                                <DialogDescription className="text-white">
                                    Make changes to the Lesson item here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <LessonDialog lesson={lesson} ></LessonDialog>
                        </DialogContent>
                    </Dialog>
                    <Button
                        onClick={() => handleDeleteLesson(_id)}
                        variant="outline" size="sm" className="text-red-700">
                        Delete
                    </Button>
                </div>
            </TableCell> */}
        </TableRow>
    );
};

export default CashRequestTable;