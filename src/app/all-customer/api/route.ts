import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Users {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    accountType: string,
    status: string;
    createdAt: string;
}
// Get All Users
export const useGetAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isPending, isError, error } = useQuery<Users[]>({
        queryFn: async () => {
            const { data } = await axiosSecure.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/all-users`)
            return data;
        },
        queryKey: ['all-users']
    })
    return { data, isPending, isError, error }
}
//block User
export const useBlockUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (_id: string) => {
            console.log('insude qyert', _id)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/block-user/${_id}`, { status: 'block' })
            return data
        },
        mutationKey: ['block-user'],
        onSuccess: (data) => {
            if (data?.success) {
                Swal.fire({
                    title: "Success",
                    text: "user Blocked",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }, onError: (error) => {
            toast.error('failed operation try again latter')
            console.log(error)
        },
    })
}