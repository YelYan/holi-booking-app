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
                        onValueChange={field.onChange}
                        value={
                          typeof field.value === "string" ||
                          typeof field.value === "undefined"
                            ? field.value
                            : typeof field.value === "number"
                            ? String(field.value)
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
