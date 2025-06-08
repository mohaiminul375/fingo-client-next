import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
interface ApiErrorResponse {
    message?: string;
}
interface ReqProp {
    agent_name: string | undefined;
    agent_phone_number: string | undefined;
}
// Send Cash request to Admin from agent
export const useAgentCashRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newReq: ReqProp) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/request-money-agent/request`, newReq)
            return data
        },
        mutationKey: ['cash-request-user'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                Swal.fire({
                    title: "Success",
                    text: "Request send successfully please wait for approved",
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