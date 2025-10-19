// payment-api-client.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client";

/*---------------- Types ------------------*/
export type BookingDetailsT = {
  adultCount: number;
  childCount: number;
  email: string;
  name: string;
  checkIn: string;
  checkOut: string;
};

export type ConfirmPaymentRequestT = {
  hotelId: string;
  paymentIntentId: string;
  bookingDetails: BookingDetailsT;
};

/*---------------- API Fetch Functions ------------------*/ 
export const fetchCreatePaymentIntent = async (hotelId: string, numberOfNights: number) => {
  const response = await apiClient.post(`/${hotelId}/bookings/payment-intent`, { numberOfNights });
  if (!response.data) {
    throw new Error("Payment Intent creation failed");
  }
  return response.data;
};

export const fetchConfirmPayment = async ({ hotelId, paymentIntentId, bookingDetails }: ConfirmPaymentRequestT) => {
  const response = await apiClient.post(
    `/${hotelId}/bookings/confirm-payment`,
    {
      paymentIntentId,
      ...bookingDetails // Spread booking details to match backend expectations
    }
  );
  if (!response.data) {
    throw new Error("Payment confirmation failed");
  }
  return response.data;
};

/*---------------- API Hooks ------------------*/ 
export const useCreatePaymentIntent = ({ hotelId, numberOfNights }: { hotelId: string; numberOfNights: number; }) => {
  return useQuery({
    queryKey: ["paymentIntent", hotelId, numberOfNights],
    queryFn: () => fetchCreatePaymentIntent(hotelId, numberOfNights),
    retry: false,
    enabled: !!hotelId && numberOfNights > 0,
  });
};

export const useConfirmPaymentBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["confirmPayment"],
    mutationFn: fetchConfirmPayment,
    retry: false,
    onSuccess: () => {
      // Invalidate relevant queries after successful booking
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      queryClient.invalidateQueries({ queryKey: ["paymentIntent"] });
    },
  });
};