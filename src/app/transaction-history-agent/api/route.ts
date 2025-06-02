import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface TrxProp {
    _id: string;
    TrxID: string;
    createdAt: string;
    method: string;
    sender_name: string;
    receiver_name: string;  
    sender_phone_number: string;
    receiver_phone_number: string;
    phone_number: string;
    user_name: string;
    user_phone_number: string;
    amount: number;
    agent_income:number;
    charge:number
}
interface queryProps {
    phone_number: string;
}
export const useGetUserTrx = ({ phone_number }: queryProps) => {
    const { data, isPending, isError, error } = useQuery<TrxProp[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction-history/agent-transactions/${phone_number}`)
            return data;
        },
        queryKey: ['all-user-trx']
    })
    return { data, isPending, isError, error }
}