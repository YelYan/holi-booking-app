import axios from "axios";
import { queryClient } from "@/lib/react-query";
import { showValidationError } from "@/lib/showValidationErrors";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api/v1" ;

const apiClient = axios.create({
    baseURL: API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
    withCredentials: true, // Send Cookies with every request
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
  
        if(error?.response?.status == 401){
        // Clear user data from React Query
        queryClient.setQueryData(["user"], null);
        showValidationError(error)
        }
        return Promise.reject(error)
    }
)

export default apiClient;