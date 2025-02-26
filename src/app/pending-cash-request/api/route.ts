import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface CashReq {
    _id: string,
    agent_name: string,
    agent_phone_number: string,
    request_amount: number,
    status: string,
    account_status: string;
    requestedAt: string;
}
// Pending cash request list send from agent
export const usePendingCashReq = () => {
    const { data, isPending, isError, error } = useQuery<CashReq[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-cashRequest-agent`)
            return data;
        },
        queryKey: ['all-cash-request']
    })
    return { data, isPending, isError, error }
}