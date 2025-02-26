'use client'
import { useAuth } from "@/Provider/AuthProvider"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
// Login function
//TODO: error handle
//Handle Login Authentication
export const useUserLogin = () => {
    const { setToken } = useAuth();
    const router = useRouter();
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
                // Set token to SS and update to call context API
                sessionStorage.setItem('token', data.token)
                setToken(data?.token)
                setTimeout(() => {
                    router.replace('/')
                }, 1000)
            }
        }, onError: (error) => {
            console.log(error)
            //error.response.data.message


        },
    })
}