// import { useAuth } from "@/Provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:8800"
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('token')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error)
    })


    axiosSecure.interceptors.response.use((res) => {
        return res;
    }, (error) => {
        const statusCode = error.response.status
        if (statusCode == 401 || statusCode == 403) { }
        return Promise.reject(error)
    })
    return axiosSecure;
}
export default useAxiosSecure;