import { useParams } from "react-router";
import ManageHotelForm from "@/features/addHotel/components/AddHotelForm";
import { useMyHotelById } from "@/services/hotels/hotels-api-client";
import { LoadingSpinner } from "@/shared/common";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data, isLoading, isSuccess } = useMyHotelById(hotelId as string);

  function handleSave(hotelFormData: FormData) {
    console.log("work");
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <ManageHotelForm
        type="edit"
        hotel={data?.hotel}
        onSave={handleSave}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default EditHotel;
