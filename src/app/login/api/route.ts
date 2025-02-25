import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const useUserLogin = () => {
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, user_info)
            return data
        },
        mutationKey: ['login-user'],
        onSuccess: (data) => {

            console.log(data)
            if (data.success === true) {
                toast.success('Registration successfully please login')
                sessionStorage.setItem('token', data.token)
            }
        }, onError: (error) => {
            console.log(error)
            //error.response.data.message


        },
    })
}