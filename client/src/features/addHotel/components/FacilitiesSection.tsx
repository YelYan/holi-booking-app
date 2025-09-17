import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, Controller } from "react-hook-form";
import { hotelFacilities } from "@/shared/constants";
import type { HotelFormDataT } from "@/types/hotel.type";
import { Label } from "@radix-ui/react-label";
import useRenderFormErrors from "@/shared/hooks/useRenderFormErrors";

const FacilitiesSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<HotelFormDataT>();

  const { renderFormErrors } = useRenderFormErrors();

  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-4">
        <Controller
          name="facilities"
          control={control}
          rules={{
            validate: (facilities) =>
              facilities && facilities.length > 0
                ? true
                : "At least one facility is required",
          }}
          render={({ field }) => (
            <>
              {hotelFacilities.map((facility) => {
                const isChecked = field.value?.includes(facility) || false;

                return (
                  <Label
                    key={facility}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), facility]);
                        } else {
                          field.onChange(
                            (field.value || []).filter(
                              (f: string) => f !== facility
                            )
                          );
                        }
                      }}
                    />
                    <span>{facility}</span>
                  </Label>
                );
              })}
            </>
          )}
        />
      </div>

      {errors.facilities &&
        renderFormErrors(errors.facilities?.message as string)}
    </div>
  );
};

export default FacilitiesSection;
