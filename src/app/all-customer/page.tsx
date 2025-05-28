'use client'
import WebLogo from "@/components/Shared/WebLogo";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsers } from "./api/route";
import Loading from "../loading";
import UsersTable from "@/components/Admin/UsersTable";
import { useAuth } from "@/Provider/AuthProvider";

// All Users List
const AllCustomer = () => {
    const { user, logOut } = useAuth();
    const { data: users = [], isPending, error, isError } = useGetAllUsers();
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
            {/* Heading */}
            <div className="max-w-xl mx-auto text-center bg-popover-foreground text-white py-2 rounded-md">
                <WebLogo />
                <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                    Welcome to Users Dashboard
                </h2>
                <p className="text-lg mb-6">
                    See all customers of Fingo-MFS
                </p>
            </div>
            {/* TODO:filter */}
            <div>

            </div>
            {/* table */}

            <div>
                <h2 className="text-xl font-bold">Total Users:{users.length}</h2>
            </div>
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
                        {users?.map((user, idx) => (
                            <UsersTable
                                key={user._id}
                                user={user}
                                idx={idx}
                            >

                            </UsersTable>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>

    );
};

export default AllCustomer;