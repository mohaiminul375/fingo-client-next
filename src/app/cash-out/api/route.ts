import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// Verification before cash out
export const useVerifyCashOut = () => {
    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL2}/verify-cashOut`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-sendMoney'],

    })
}
// Complete cash out after verification
export const useCompleteCashOut = () => {
    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL2}/complete-cashOut`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-SendMoney'],

    })
}