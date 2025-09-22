// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { AxiosError } from "axios";
import { useQuery  } from "@tanstack/react-query";
import apiClient from "../api-client";

// import type { ErrorResponse } from "@/types/api.type";
// import { showValidationError } from "@/lib/showValidationErrors";
import type { SearchParams } from "@/types/search.type";

/*---------------- api fetch ------------------*/ 
export const fetchAddHotel = async (formdata: FormData) => {
        const response = await apiClient.post("/my-hotels/create-my-hotel", formdata);
        if(!response.data) {
            throw new Error("Add Hotel failed");
        }
        return response.data;
}
export const fetchSearchHotels = async (queryParams : SearchParams) => {
        const response = await apiClient.get(`/hotels/search-hotels?${queryParams}`);
        if(!response.data) {
            throw new Error("Error fetching hotels");
        }
        return response.data;
}

/*---------------- api hooks ------------------*/ 
export const useSearchHotels = (searchParams : SearchParams) => {
    const queryParams = new URLSearchParams();
    
    queryParams.append("destination" , searchParams.destination || "");
    queryParams.append("checkIn" , searchParams.checkIn || "");
    queryParams.append("checkOut" , searchParams.checkOut || "");
    queryParams.append("adultCount" , searchParams.adultCount || "");
    queryParams.append("childCount" , searchParams.childCount || "");
    queryParams.append("page" , searchParams.page || "");
    queryParams.append("maxPrice" , searchParams.maxPrice || "");

    searchParams.facilities?.forEach((facility) => {
        return queryParams.append("facilities", facility)
    })
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));


return useQuery({
    queryKey : ["search-hotels" , searchParams],
    queryFn : () => fetchSearchHotels(queryParams as SearchParams),
})
}