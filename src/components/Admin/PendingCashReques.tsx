import React from 'react';
import { TableCell, TableRow } from '../ui/table';
interface User {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    userType: string,
    account_status: string;
    createdAt: string;
}
interface TableProps {
    idx: number;
    agent: User;
}
const CashRequestTable = ({ agent, idx }: TableProps) => {
    const { _id, name, phone_number, email, userType, account_status, createdAt } = agent;
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