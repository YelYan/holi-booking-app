import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BtnLoading } from "@/shared/common";
import DetailsFormSection from "./DetailsFormSection";
import FacilitiesSection from "./FacilitiesSection";
import type { HotelFormDataT } from "@/types/hotel.type";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import GuesteSection from "./GuestesSection";

type AddHotelFormPropsT = {
  isLoading: boolean;
};

const AddHotelForm = ({ isLoading }: AddHotelFormPropsT) => {
  const formMethods = useForm<HotelFormDataT>();

  function onSubmit() {
    console.log("work");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Hotel</CardTitle>
        <CardDescription>Fill your hotel information</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit} className="space-y-8">
            <DetailsFormSection />
            <FacilitiesSection />
            <GuesteSection />
            <Button
              type="submit"
              variant={"default"}
              className="bg-blue-700 text-white cursor-pointer"
            >
              {isLoading ? <BtnLoading /> : "Save"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddHotelForm;
