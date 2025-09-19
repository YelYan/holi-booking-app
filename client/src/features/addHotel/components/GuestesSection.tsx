import { useFormContext, Controller } from "react-hook-form";
import { guestsSectionFormControls } from "@/shared/constants";
import type { HotelFormDataT } from "@/types/hotel.type";
import { Label } from "@radix-ui/react-label";
import useRenderFormErrors from "@/shared/hooks/useRenderFormErrors";
import { Input } from "@/components/ui/input";

const GuesteSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<HotelFormDataT>();

  const { renderFormErrors } = useRenderFormErrors();

  return (
    <div className="relative space-y-4">
      {guestsSectionFormControls.map((formControl) => {
        return (
          <div className="grid gap-1" key={formControl.name}>
            <Label>{formControl.label}</Label>
            <Controller
              name={formControl.name as keyof HotelFormDataT}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    id={formControl.name}
                    name={formControl.name}
                    placeholder={formControl.placeholder}
                    type={formControl.type}
                    value={
                      typeof field.value === "string" ||
                      typeof field.value === "number" ||
                      Array.isArray(field.value) ||
                      typeof field.value === "undefined"
                        ? field.value ?? ""
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {errors[formControl.name as keyof HotelFormDataT] &&
                    renderFormErrors(
                      errors[formControl.name as keyof HotelFormDataT]
                        ?.message as string
                    )}
                </div>
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GuesteSection;
