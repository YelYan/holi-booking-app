import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hook";
import { Button } from "@/components/ui/button";
import { useConfirmPaymentBooking } from "@/services/payments/payment-api-client";
import { toast } from "react-hot-toast"; // or your toast library
import { useState } from "react";

type UserType = {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

export type BookingFormDataT = {
  name: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  email: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

type PropsT = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent, totalCost }: PropsT) => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const { checkIn, checkOut, adultCount, childCount } = useAppSelector(
    (state) => state.search
  );

  // Use the mutation hook
  const confirmPaymentMutation = useConfirmPaymentBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormDataT>({
    defaultValues: {
      name: currentUser.user.name,
      email: currentUser.user.email,
      hotelId: hotelId || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      adultCount: adultCount || 1,
      childCount: childCount || 0,
      paymentIntentId: paymentIntent.paymentIntentId || "",
      totalCost: totalCost || 0,
    },
  });

  const onSubmit = async (formData: BookingFormDataT) => {
    if (!stripe || !elements) {
      toast.error("Stripe is not loaded. Please refresh and try again.");
      return;
    }

    if (!hotelId) {
      toast.error("Hotel ID is missing");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Confirm card payment with Stripe
      const stripeResult = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );

      if (stripeResult.error) {
        toast.error(stripeResult.error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (stripeResult.paymentIntent?.status === "succeeded") {
        // Step 2: Confirm booking with your backend
        // Prepare booking details matching backend expectations
        const bookingDetails = {
          name: formData.name,
          email: formData.email,
          adultCount: formData.adultCount,
          childCount: formData.childCount,
          checkIn: formData.checkIn, // Should be ISO string format
          checkOut: formData.checkOut, // Should be ISO string format
        };

        confirmPaymentMutation.mutate(
          {
            hotelId: hotelId,
            paymentIntentId: paymentIntent.paymentIntentId,
            bookingDetails,
          },
          {
            onSuccess: (data) => {
              toast.success("Room booked successfully!");
              console.log("Booking confirmed:", data);

              // Navigate to bookings page or confirmation page
              navigate("/my-bookings");
              // Or if you want to show the specific booking:
              // navigate(`/booking-confirmation/${data.booking._id}`);
            },
            onError: (error: any) => {
              const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Booking confirmation failed. Please contact support.";

              toast.error(errorMessage);
              console.error("Booking error:", error);
            },
            onSettled: () => {
              setIsProcessing(false);
            },
          }
        );
      } else {
        toast.error("Payment was not successful");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  const isLoading = isProcessing || confirmPaymentMutation.isPending;

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <span className="font-bold text-lg">Confirm your details</span>

        {/* Guest Details */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="name"
              type="text"
              readOnly
              disabled
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email"
              type="email"
              readOnly
              disabled
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-2">
          <Label>Your price summary</Label>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ${totalCost}
            </div>
            <div className="text-xs text-blue-600">
              Includes taxes and charges
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-2">
          <Label>Payment Details</Label>
          <CardElement
            className="p-4 border border-gray-300 rounded-md"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {/* Error message display */}
        {confirmPaymentMutation.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Booking confirmation failed. Please try again or contact support.
          </div>
        )}

        {/* Success message */}
        {confirmPaymentMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Booking confirmed successfully! Redirecting...
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !stripe || !elements}
            className="min-w-[150px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
