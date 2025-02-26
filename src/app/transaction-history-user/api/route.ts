import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface TrxProp {
    _id: string;
    trx_id: string;
    createdAt: string;
    method: string;
    sender_name: string;
    receiver_name: string;
    agent_name: string;
    sender_phone_number: string;
    receiver_phone_number: string;
    agent_phone_number: string;
    phone_number: string;
    amount: number;
}
interface queryProps {
    phone_number: string;
}
export const useGetUserTrx = ({ phone_number }: queryProps) => {
    const { data, isPending, isError, error } = useQuery<TrxProp[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-transaction-user/${phone_number}`)
            return data;
        },
        queryKey: ['all-user-trx']
    })
    return { data, isPending, isError, error }
}