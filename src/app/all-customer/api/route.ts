import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/all-users`)
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
        mutationFn: async (id: string) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL2}/agent-approval-admin/${id}`)
            return data
        },
        mutationKey: ['approve-agent'],
        onSuccess: (data) => {
            if (data?.success) {
                Swal.fire({
                    title: "Success",
                    text: "Request Approved",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }, onError: (error) => {
            toast.error('failed operation try again latter')
            console.log(error)
            //error.response.data.message


        },
    })
}