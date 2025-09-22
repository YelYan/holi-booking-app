import { useState } from "react";
import { useSearchHotels } from "@/services/searchFilters/search-filter-api-client";
import { useAppSelector } from "@/store/hook";
import FilterAll from "../components/FilterAll";
import { LoadingSpinner } from "@/shared/common";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const searchValues = useAppSelector((state) => state.search);

  const [selectedStar, setSelectStar] = useState<string>("");
  const [facilities, setFacilities] = useState<string[]>([]);
  const [allHotelType, setHotelTypes] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectMaxPrice] = useState<number | undefined>();

  const searchParams = {
    destination: searchValues.destination,
    checkIn: searchValues.checkIn?.toISOString(),
    checkOut: searchValues.checkOut?.toISOString(),
    childCount: searchValues.childCount.toString(),
    adultCount: searchValues.adultCount.toString(),
    page: page.toString(),
  };

  console.log(searchParams, "search");

  const { data: hotels, isLoading, isSuccess } = useSearchHotels(searchParams);

  function handleStarChange(value: string) {
    setSelectStar(value);
  }

  function handlefacilitiesChange(checked: string | boolean, facility: string) {
    setFacilities((prev: string[]) =>
      checked ? [...prev, facility] : prev.filter((hotel) => hotel !== facility)
    );
  }
  function handleHotelTypeChange(checked: string | boolean, hotelType: string) {
    setHotelTypes((prev: string[]) =>
      checked
        ? [...prev, hotelType]
        : prev.filter((hotel) => hotel !== hotelType)
    );
  }

  function handleMaxPriceChange(value: string) {
    const maxPrice = parseInt(value);
    setSelectMaxPrice(maxPrice);
  }

  // console.log(hotels);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg bg-white border border-gray-300 shadow-md h-fit sticky p-4">
        <FilterAll
          facilities={facilities}
          allHotelType={allHotelType}
          handleStarChange={handleStarChange}
          handlefacilitiesChange={handlefacilitiesChange}
          handleHotelTypeChange={handleHotelTypeChange}
          handleMaxPriceChange={handleMaxPriceChange}
        />
      </div>
      <div className="md:col-span-2">
        {isLoading && <LoadingSpinner />}
        {isSuccess && "Helllo"}
      </div>
    </div>
  );
};

export default Search;
