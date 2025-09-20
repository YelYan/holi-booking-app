import { useFormContext, Controller } from "react-hook-form";
import type { HotelFormDataT } from "@/types/hotel.type";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRenderFormErrors from "@/shared/hooks/useRenderFormErrors";
import { detailsSectionFormControls } from "@/shared/constants";

const DetailsFormSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<HotelFormDataT>();

  const { renderFormErrors } = useRenderFormErrors();

  return (
    <div className="space-y-4">
      {detailsSectionFormControls.map((formControl) => (
        <div className="grid gap-1" key={formControl.name}>
          <Label>{formControl.label}</Label>
          <Controller
            control={control}
            rules={{
              validate: (value) => {
                // Example of a custom validation based on the field's name
                if (
                  formControl.name === "name" &&
                  typeof value === "string" &&
                  value.length < 3
                ) {
                  return "Hotel name must be at least 3 characters.";
                }
                if (
                  formControl.name === "country" &&
                  typeof value === "string" &&
                  value.length < 1
                ) {
                  return "Country name must be at least 3 characters.";
                }
                if (
                  formControl.name === "city" &&
                  typeof value === "string" &&
                  value.length < 1
                ) {
                  return "City name must be at least 3 characters.";
                }
                if (
                  formControl.name === "description" &&
                  typeof value === "string" &&
                  value.length < 10
                ) {
                  return "Description must be at least 10 characters.";
                }
                if (
                  formControl.name === "pricePerNight" &&
                  typeof value === "number" &&
                  value <= 0
                ) {
                  return "Price per night must be a positive number.";
                }
                // Return true if the value is valid
                return true;
              },
            }}
            name={formControl.name as keyof HotelFormDataT}
            render={({ field }) => {
              switch (formControl.componentType) {
                case "input":
                  return (
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
                  );
                case "textarea":
                  return (
                    <div className="relative">
                      <Textarea
                        className="min-h-32 max-h-32"
                        {...field}
                        id={formControl.name}
                        placeholder={formControl.placeholder}
                        value={
                          typeof field.value === "string" ||
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
                  );
                case "select":
                  return (
                    <div className="relative">
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={
                          // Simplify the value check
                          typeof field.value === "number"
                            ? String(field.value)
                            : typeof field.value === "string"
                            ? field.value
                            : ""
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={formControl.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {formControl.options &&
                            formControl.options.map(
                              (option: {
                                value: string | number;
                                label: string;
                              }) => (
                                <SelectItem
                                  key={option.value}
                                  value={String(option.value)}
                                >
                                  {option.label}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                      {errors[formControl.name as keyof HotelFormDataT] &&
                        renderFormErrors(
                          errors[formControl.name as keyof HotelFormDataT]
                            ?.message as string
                        )}
                    </div>
                  );
                default:
                  return <></>;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailsFormSection;
