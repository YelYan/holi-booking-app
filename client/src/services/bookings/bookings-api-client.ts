import {  useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";

/*---------------- API Fetch Functions ------------------*/ 
export const fecthMyBookings = async () => {
        const response = await apiClient.get("/get-my-bookings/");
        if(!response.data) {
            throw new Error("Fetch bookings failed");
        }
        return response.data;
}

/*---------------- API Hooks ------------------*/ 
export const useMyBookings = () => {
return useQuery({
    queryKey : ["bookings"],
    queryFn : fecthMyBookings,
})
}

