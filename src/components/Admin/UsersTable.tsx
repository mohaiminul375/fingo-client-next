import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { ImBlocked } from "react-icons/im";
import Swal from 'sweetalert2';
import { useBlockUser } from '@/app/all-customer/api/route';
interface User {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    accountType: string,
    status: string;
    createdAt: string;
}
interface TableProps {
    idx: number;
    user: User;
}
// Table of Users
const UsersTable = ({ user, idx }: TableProps) => {
    const { _id, name, phone_number, email, accountType, status, createdAt } = user;
    const blockUser = useBlockUser()
    const handleBlockUser = (_id: string) => {
        console.log(_id);
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
                await blockUser.mutateAsync(_id)
            }
        });
    }
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
                {accountType} <br />{status}
            </TableCell>
            <TableCell>
                {new Date(createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
                {status === 'Blocked' ? <Button variant='secondary'>Blocked</Button> : <Button
                    disabled={email === 'mohaiminul375@gmail.com'}
                    onClick={() => handleBlockUser(_id)} variant='secondary'>
                    <ImBlocked className='text-red-700' />
                </Button>}
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

export default UsersTable;