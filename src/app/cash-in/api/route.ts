import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// Verify Cash IN method
export const useVerifyCashIn = () => {
    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cashIn/verify-cashIn`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-cashIn'],

    })
}
// After Verification complete transaction
export const useCompleteCashIn = () => {
    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cashIn/complete-cashIn`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-cashIn'],

    })
}