import {  useQuery} from "@tanstack/react-query";
import apiClient from "../api-client";

/*---------------- api fetch ------------------*/ 
export const fetchCreatePaymentIntent = async (hotelId : string, numberOfNights: number) => {
        const response = await apiClient.post(`/${hotelId}/bookings/payment-intent`,{ numberOfNights });
        if(!response.data) {
            throw new Error("Payment Intent creation failed");
        }
        return response.data;
}



/*---------------- api hooks ------------------*/ 
export const useCreatePaymentIntent = ({ hotelId, numberOfNights }: { hotelId: string; numberOfNights: number; }) => {
return useQuery({
    queryKey : ["paymentIntent"],
    queryFn : () => fetchCreatePaymentIntent(hotelId, numberOfNights),
    retry : false, // don't retry if unauthorized
    enabled : !!hotelId && numberOfNights > 0, // only run if hotelId is provided and numberOfNights is greater than 0
})
}




