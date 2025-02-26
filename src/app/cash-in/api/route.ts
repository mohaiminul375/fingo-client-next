import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useVerifyCashIn = () => {

    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/verify-cashIn`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-cashIn'],

    })
}
export const useCompleteCashIn = () => {

    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/complete-cashIn`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-cashIn'],

    })
}