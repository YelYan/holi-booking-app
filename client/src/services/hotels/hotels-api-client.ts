import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import type { HotelFormDataT } from "@/types/hotel.type";
import type { ErrorResponse } from "@/types/api.type";
import { showValidationError } from "@/lib/showValidationErrors";

/*---------------- api fetch ------------------*/ 
export const fetchAddHotel = async (formdata: HotelFormDataT) => {
        const response = await apiClient.post("/my-hotels/create-my-hotel", formdata);
        if(!response.data) {
            throw new Error("Add Hotel failed");
        }
        return response.data;
}
export const fetchMyHotels = async () => {
        const response = await apiClient.get("/my-hotels/get-my-hotels");
        if(!response.data) {
            throw new Error("View hotels failed");
        }
        return response.data;
}
export const fetchHotelById = async (hotelId : string) => {
        const response = await apiClient.get(`/my-hotels/${hotelId}`);
        if(!response.data) {
            throw new Error("Error fetching hotel");
        }
        return response.data;
}
export const fetchUpdateHotel = async ({formData, hotelId}: {formData : FormData, hotelId : string}) => {
        const response = await apiClient.put(`/my-hotels/update-my-hotel/${hotelId}`, formData);
        if(!response.data) {
            throw new Error("Update Hotel failed");
        }
        return response.data;
}

/*---------------- api hooks ------------------*/ 
export const useMyHotels = () => {
return useQuery({
    queryKey : ["my-hotels"],
    queryFn : fetchMyHotels,
})
}

export const useMyHotelById = (hotelId : string) => {
return useQuery({
    queryKey : ["my-hotels", hotelId],
    queryFn : () => fetchHotelById(hotelId),
})
}

export const useAddHotel = () => {
    return useMutation({
        mutationFn : fetchAddHotel,
        onSuccess: async (data) => {
            toast.success(data.message);
        },
        onError: (error : AxiosError<ErrorResponse>) => {
           showValidationError(error)
        },
    })
}
export const useUpdateHotel = (hotelId : string) => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn : (formData : FormData) => fetchUpdateHotel({formData , hotelId}),
        onSuccess: async (data) => {
            toast.success(data.message);
            navigate(-1)
        },
        onError: (error : AxiosError<ErrorResponse>) => {
           showValidationError(error)
        },
    })
}