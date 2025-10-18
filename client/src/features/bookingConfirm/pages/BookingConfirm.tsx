import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hook";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/shared/common";
import { useCurrentUser } from "@/services/auth/auth-api-client";
import { useMyHotelById } from "@/services/hotels/hotels-api-client";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/shared/hooks/useAuth";
import { useCreatePaymentIntent } from "@/services/payments/payment-api-client";

import BookingDetailsSummary from "../components/BookingDetailsSummary";
import BookingForm from "../components/BookingForm";

const BookingConfirm = () => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { hotelId } = useParams<{ hotelId: string }>();
  const { data: currentUser, isLoading } = useCurrentUser();
  const { stripePromise } = useAuth();
  const { data } = useMyHotelById(hotelId as string);

  const { data: paymentIntent } = useCreatePaymentIntent({
    hotelId: hotelId as string,
    numberOfNights,
  });

  console.log("Payment Intent Data: ", paymentIntent);

  const { checkIn, checkOut, adultCount, childCount } = useAppSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate > checkInDate) {
        const nights =
          (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
        setNumberOfNights(nights);
      } else {
        setNumberOfNights(0);
      }
    }
  }, [checkIn, checkOut]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data?.hotel) {
    return <div>No hotel data found</div>;
  }

  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4">
      <div className="">
        <BookingDetailsSummary
          checkIn={checkIn}
          checkOut={checkOut}
          adultCount={adultCount}
          childCount={childCount}
          numberOfNights={numberOfNights}
          hotel={data?.hotel}
        />
      </div>
      <div className="">
        {currentUser && paymentIntent?.paymentIntentId && (
          <Elements stripe={stripePromise}>
            <BookingForm
              currentUser={currentUser}
              paymentIntentId={paymentIntent?.paymentIntentId}
              totalCost={paymentIntent?.totalCosts}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default BookingConfirm;
