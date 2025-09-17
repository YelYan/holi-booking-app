import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { HotelFormDataT } from "@/types/hotel.type";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import useRenderFormErrors from "@/shared/hooks/useRenderFormErrors";

const ImagesUploadSection = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormDataT>();
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const { renderFormErrors } = useRenderFormErrors();
  const selectedFile = watch("imageFiles");

  useEffect(() => {
    if (!selectedFile || selectedFile.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls: { file: File; url: string }[] = [];

    Array.from(selectedFile).forEach((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.push({ file, url });
    });

    setPreviews(objectUrls);

    // Cleanup on unmount
    return () => objectUrls.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [selectedFile]);

  const removeImage = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    // Update form value
    const updatedFiles = updatedPreviews.map((p) => p.file);
    setValue("imageFiles", updatedFiles as unknown as FileList, {
      shouldValidate: true,
    });
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <Controller
          control={control}
          name="imageFiles"
          rules={{
            validate: (files) =>
              files && files.length > 0
                ? true
                : "At least one image is required",
          }}
          render={({ field }) => (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={(e) => field.onChange(e.target.files)}
              />
              <Label
                htmlFor="image-upload"
                className="py-1 px-3 border border-gray-400 rounded-md cursor-pointer"
              >
                Upload Images
              </Label>

              {previews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {previews.map(({ url }, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded overflow-hidden border"
                    >
                      <img
                        src={url}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        />
      </div>
      {errors.imageFiles?.message &&
        renderFormErrors(errors.imageFiles.message)}
    </div>
  );
};

export default ImagesUploadSection;
