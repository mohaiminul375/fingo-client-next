import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
interface CashReq {
    _id: string,
    agent_name: string,
    agent_phone_number: string,
    request_amount: number,
    status: string,
    account_status: string;
    createdAt: string;
}
// Pending withdraw request list send from agent
export const usePendingCashReq = () => {
    const { data, isPending, isError, error } = useQuery<CashReq[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/request-withdraw-agent/all-request`)
            return data;
        },
        queryKey: ['all-withdraw-request']
    })
    return { data, isPending, isError, error }
}
// approve cash Request
export const useApproveWithdraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (approve_Req: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/request-withdraw-agent/approve-request`, approve_Req)
            return data
        },
        mutationKey: ['approve-cash-request'],
        onSuccess: (data) => {
            if (data.success == true) {
                Swal.fire({
                    title: "Success",
                    text: "Approved successfully",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['all-withdraw-request'] })
            }
        }, onError: () => {
            toast.error('failed approved')
        }

    })
}