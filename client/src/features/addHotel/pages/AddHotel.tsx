import ManageHotelForm from "../components/AddHotelForm";
import { useAddHotel } from "@/services/hotels/hotels-api-client";

const AddHotel = () => {
  const addHotel = useAddHotel();
  function handleSave(hotelFormData: FormData) {
    addHotel.mutate(hotelFormData);
  }

  return (
    <ManageHotelForm
      onSave={handleSave}
      isLoading={addHotel.isPending}
      isSuccess={addHotel.isSuccess}
    />
  );
};

export default AddHotel;
