import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface CashReq {
    _id: string;
}
export const usePendingCashReq = () => {
    const { data, isPending, isError, error } = useQuery<CashReq[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-cashRequest-agent`)
            return data;
        },
        queryKey: ['all-cas']
    })
    return { data, isPending, isError, error }
}