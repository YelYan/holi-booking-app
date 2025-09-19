import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
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


/*---------------- api hooks ------------------*/ 
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