import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface PendingAgents {
    _id: string,
    name: string,
    phone_number: string,
    email: string,
    userType: string,
    account_status: string;
    createdAt: string;
}
interface UpdateProps {
    id: string,
    newStatus: object,
}
export const usePendingAgents = () => {
    const { data, isPending, isError, error } = useQuery<PendingAgents[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pending-agent-admin`)
            return data;
        },
        queryKey: ['all-pending-agents']
    })
    return { data, isPending, isError, error }
}

export const useApprovedAgent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, newStatus }: UpdateProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/agent-approval-admin/${id}`, newStatus)
            return data
        },
        mutationKey: ['approve-agent'],
        onSuccess: (data) => {

            console.log(data)
            if (data.modifiedCount > 0) {
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