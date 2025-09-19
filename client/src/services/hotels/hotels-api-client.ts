import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import type { ErrorResponse } from "@/types/api.type";
import { showValidationError } from "@/lib/showValidationErrors";

/*---------------- api fetch ------------------*/ 
export const fetchAddHotel = async (formdata: unknown) => {
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


/*---------------- api hooks ------------------*/ 
export const useMyHotels = () => {
return useQuery({
    queryKey : ["my-hotels"],
    queryFn : fetchMyHotels,
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