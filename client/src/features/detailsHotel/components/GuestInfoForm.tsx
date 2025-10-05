import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAppSelector } from "@/store/hook";
import { useAppDispatch } from "@/store/hook";
import { useNavigate, useLocation } from "react-router";
import { saveSearchValues } from "@/store/slices/searchSlice";

type GuestFormDataT = {
  adultCount: number;
  childCount: number;
  checkIn: Date | null;
  checkOut: Date | null;
};

const GuestInfoForm = ({
  pricePerNight,
  hotelId,
}: {
  pricePerNight: number;
  hotelId: string;
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adultCount: search.adultCount || 1,
      childCount: search.childCount || 0,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSubmit = (data: GuestFormDataT) => {
    dispatch(
      saveSearchValues({
        adultCount: data?.adultCount,
        childCount: data?.childCount,
        checkIn: data?.checkIn,
        checkOut: data?.checkOut,
        destination: "",
      })
    );
    navigate(`/hotel/${hotelId}/booking`, { state: { from: location } });
  };

  const onSignInClick = (data: GuestFormDataT) => {
    dispatch(
      saveSearchValues({
        adultCount: data?.adultCount,
        childCount: data?.childCount,
        checkIn: data?.checkIn,
        checkOut: data?.checkOut,
        destination: "",
      })
    );
    navigate("/login", { state: { from: location } });
  };

  return (
    <div className="bg-blue-300 p-3 rounded-md space-y-3">
      <h3 className="text-lg font-semibold">${pricePerNight} per night</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="space-y-3"
      >
        <div className="">
          <DatePicker
            selected={checkIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="w-full bg-white p-2 focus:outline-none rounded-md"
            wrapperClassName="min-w-full"
            onChange={(date) => {
              setValue("checkIn", date);
            }}
          />
        </div>

        <div className="">
          <DatePicker
            selected={checkOut}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="w-full bg-white p-2 focus:outline-none rounded-md"
            wrapperClassName="min-w-full"
            onChange={(date) => setValue("checkOut", date)}
          />
        </div>

        <div className="bg-white rounded p-2">
          <Label className="text-black font-semibold flex flex-col gap-2 items-start">
            Adult:
            <Input
              className="w-full p-1 focus:outline-none font-bold"
              defaultValue={1}
              max={20}
              min={1}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
              type="number"
            />
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </Label>
        </div>
        <div className="bg-white rounded p-2">
          <Label className="text-black font-semibold flex flex-col gap-2 items-start">
            Children:
            <Input
              type="number"
              min={0}
              max={20}
              defaultValue={0}
              className="w-full p-1 focus:outline-none font-bold"
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </Label>
        </div>
        {isLoggedIn ? (
          <Button>Book Now</Button>
        ) : (
          <Button>Login To Book</Button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
