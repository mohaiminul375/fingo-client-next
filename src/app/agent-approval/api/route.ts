'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
interface UpdateProps {
    id: string,
    newStatus: object,
}
// List of Pending Status Agents
export const usePendingAgents = () => {
    const { data, isPending, isError, error } = useQuery<PendingAgents[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL2}/all-pending-agent-admin`)
            return data;
        },
        queryKey: ['all-pending-agents']
    })
    return { data, isPending, isError, error }
}
// Approve Agent to Active
export const useApprovedAgent = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, newStatus }: UpdateProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL2}/agent-approval-admin/${id}`, newStatus)
            return data
        },
        mutationKey: ['approve-agent'],
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
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