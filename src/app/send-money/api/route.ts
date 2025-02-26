import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useVerifySendMoney = () => {

    return useMutation({
        mutationFn: async (cashIn_Verify: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/verify-sendMoney`, cashIn_Verify)
            return data
        },
        mutationKey: ['verify-sendMoney'],

    })
}
export const useCompleteSendMoney = () => {

    return useMutation({
        mutationFn: async (cashIn_complete: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/complete-sendMoney`, cashIn_complete)
            return data
        },
        mutationKey: ['complete-SendMoney'],

    })
}