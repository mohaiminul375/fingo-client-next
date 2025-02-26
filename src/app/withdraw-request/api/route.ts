import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
interface ApiErrorResponse {
    message?: string;
}
interface ReqProp {
    agent_name: string | undefined;
    agent_number: string | undefined;
    withdrawAmount: number | undefined;
}
// Send Withdraw request to Admin from agent
export const useAgentWithdrawRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newWithdraw: ReqProp) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/request-withdraw-agent`, newWithdraw)
            return data
        },
        mutationKey: ['withdraw-request'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                Swal.fire({
                    title: "Success",
                    text: "Request withdraw successfully please wait for approved",
                    icon: "success"
                });
                queryClient.invalidateQueries({ queryKey: ['all-cash-request'] })
            }
        }, onError: (error) => {
            console.log(error)
            //error.response.data.message
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const existedError = axiosError?.response?.data?.message;
            if (existedError) {
                toast.error(existedError)
            } else if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('failed to create account')
            }

        },
    })
}