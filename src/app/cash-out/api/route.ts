import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useVerifyCashOut = () => {
    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/verify-cashOut`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-sendMoney'],

    })
}
export const useCompleteCashOut = () => {

    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/complete-sendMoney`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-SendMoney'],

    })
}