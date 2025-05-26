import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// Verification send money 
export const useVerifySendMoney = () => {
    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL2}/verify-sendMoney`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-sendMoney'],

    })
}
// Complete send money after verification
export const useCompleteSendMoney = () => {
    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL2}/complete-sendMoney`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-SendMoney'],
    })
}