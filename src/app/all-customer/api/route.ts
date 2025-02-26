import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Users {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    userType: string,
    account_status: string;
    createdAt: string;
}
// Get All Users
export const useGetAllUsers = () => {
    const { data, isPending, isError, error } = useQuery<Users[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-users-admin`)
            return data;
        },
        queryKey: ['all-users']
    })
    return { data, isPending, isError, error }
}