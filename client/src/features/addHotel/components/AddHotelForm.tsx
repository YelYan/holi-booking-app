import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import DetailsFormSection from "./DetailsFormSection";
import FacilitiesSection from "./FacilitiesSection";
import ImagesUploadSection from "./ImagesUploadSection";
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
  type?: "edit" | "create";
  hotel?: HotelFormDataT;
  isLoading: boolean;
  isSuccess: boolean;
  onSave: (hotelformData: FormData) => void;
};

const ManageHotelForm = ({
  type,
  hotel,
  isLoading,
  onSave,
  isSuccess,
}: AddHotelFormPropsT) => {
  const formMethods = useForm<HotelFormDataT>({
    defaultValues: hotel,
  });

  const navigate = useNavigate();

  const { reset } = formMethods;
  useEffect(() => {
    if (isSuccess) {
      reset(hotel);
    }
  }, [isSuccess, reset, hotel]);

  function onSubmit(formDataJson: HotelFormDataT) {
    // console.log(formDataJson);
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility: string, index: number) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    if (formDataJson.imageFiles && formDataJson.imageFiles.length > 0) {
      for (let i = 0; i < formDataJson.imageFiles.length; i++) {
        formData.append("imageFiles", formDataJson.imageFiles[i]);
      }
    }

    onSave(formData);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "edit" ? "Edit" : "Add"} Hotel</CardTitle>
        <CardDescription>Fill your hotel information</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DetailsFormSection />
            <FacilitiesSection />
            <GuesteSection />
            <ImagesUploadSection />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant={"default"}
                disabled={isLoading}
                className="bg-blue-700 text-white cursor-pointer border border-blue-700 transition-all hover:scale-105 hover:text-blue-700 hover:bg-transparent"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                className="text-black bg-transparent border border-black cursor-pointer hover:text-black hover:bg-transparent transition-all duration-100 hover:scale-105"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ManageHotelForm;
