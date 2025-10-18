import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hook";
import { Button } from "@/components/ui/button";

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

type PropsT = {
  currentUser: UserType;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntentId, totalCost }: PropsT) => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { checkIn, checkOut, adultCount, childCount } = useAppSelector(
    (state) => state.search
  );

  const { register, handleSubmit } = useForm<BookingFormDataT>({
    defaultValues: {
      name: currentUser.user.name,
      email: currentUser.user.email,
      hotelId: hotelId,
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      adultCount: adultCount || 0,
      childCount: childCount || 0,
      paymentIntentId: paymentIntentId || "",
      totalCost: totalCost || 0,
    },
  });

  const onSubmit = (data: BookingFormDataT) => {
    console.log("Form Data Submitted: ", data);
    // Handle form submission logic here
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <span className="font-bold text-lg">Confirm your details</span>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="name"
              type="text"
              readOnly
              disabled
              {...register("name")}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="email"
              type="text"
              readOnly
              disabled
              {...register("email")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Your price summary</Label>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold-text-lg">
              Total Costs : ${totalCost}
            </div>
            <div className="text-xs text-red-400">
              Includes taxes and charges
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Payment Details</Label>
          <CardElement className="p-4 border border-gray-300 rounded-md" />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant={"primary"}>
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
