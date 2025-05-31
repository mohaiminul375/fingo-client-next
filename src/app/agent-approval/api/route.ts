'use client'
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface PendingAgents {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    userType: string,
    account_status: string | undefined;
    createdAt: string;
}

// List of Pending Status Agents
export const usePendingAgents = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isPending, isError, error } = useQuery<PendingAgents[]>({
        queryFn: async () => {
            const { data } = await axiosSecure
                .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/all-pending-agents`)
            return data;
        },
        queryKey: ['all-pending-agents']
    })
    return { data, isPending, isError, error }
}
// Approve Agent to Active
export const useApprovedAgent = () => {
    const axiosSecure = useAxiosSecure()

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axiosSecure.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/approve-agent/${id}`)
            return data
        },
        mutationKey: ['approve-agent'],
        onSuccess: (data) => {
            if (data.success) {
                Swal.fire({
                    title: "Success",
                    text: "Request Approved",
                    icon: "success"
                });
                toast.success('Approved successfully')
                queryClient.invalidateQueries({ queryKey: ['all-pending-agents'] })
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }, onError: (error) => {
            toast.error('failed operation try again latter')
            console.log(error)
            //error.response.data.message


        },
    })
}