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

  // A state to manage the previews for both new and existing images
  const [previews, setPreviews] = useState<{ url: string; isNew: boolean }[]>(
    []
  );

  // Watch for changes in both imageFiles and existing imageUrls
  const selectedFiles = watch("imageFiles");
  const existingImageUrls = watch("imageUrls");

  const { renderFormErrors } = useRenderFormErrors();

  useEffect(() => {
    // This effect runs on initial load and when new files are selected.

    // First, map existing URLs into preview objects.
    const existingPreviews = (existingImageUrls || []).map((url) => ({
      url,
      isNew: false, // Flag as not a new image
    }));

    // Then, create object URLs for the newly selected files.
    const newPreviews = Array.from(selectedFiles || []).map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true, // Flag as a new image
    }));

    // Combine both sets of previews
    setPreviews([...existingPreviews, ...newPreviews]);

    // Cleanup object URLs on unmount to prevent memory leaks
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [selectedFiles, existingImageUrls]);

  const removeImage = (index: number) => {
    // Check if the image to remove is an existing one or a new one
    const imageToRemove = previews[index];

    if (imageToRemove.isNew) {
      // Logic for new files
      const updatedFiles = Array.from(selectedFiles || []).filter(
        (_, i) => i !== index - (existingImageUrls || []).length
      );
      setValue("imageFiles", updatedFiles as unknown as FileList, {
        shouldValidate: true,
      });
    } else {
      // Logic for existing URLs
      const updatedUrls = (existingImageUrls || []).filter(
        (_, i) => i !== index
      );
      setValue("imageUrls", updatedUrls, { shouldValidate: true });
    }
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <Controller
          control={control}
          name="imageFiles"
          rules={{
            validate: (files) => {
              const totalImages =
                (files?.length || 0) + (existingImageUrls?.length || 0);

              if (totalImages > 6) {
                return "Images cannot be more than 6";
              }
              if (totalImages === 0) {
                return "At least one image is required";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
              />
              <Label
                htmlFor="image-upload"
                className="py-1 px-3 border border-gray-400 rounded-md cursor-pointer"
              >
                Upload Images
              </Label>
            </>
          )}
        />
      </div>

      {previews.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded overflow-hidden border"
            >
              <img
                src={preview.url}
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
      {errors.imageFiles?.message &&
        renderFormErrors(errors.imageFiles.message)}
    </div>
  );
};

export default ImagesUploadSection;
