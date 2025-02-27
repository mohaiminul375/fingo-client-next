import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Get total transaction
export const useGetTotalTrx = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/total-transaction-platform`)
            return data;
        },
        queryKey: ['total-transaction']
    })
    return { data, isPending, isError, error }
}