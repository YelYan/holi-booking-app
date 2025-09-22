import { useState } from "react";
import { useSearchHotels } from "@/services/searchFilters/search-filter-api-client";
import { useAppSelector } from "@/store/hook";
import FilterAll from "../components/FilterAll";
import SearchResultsCard from "../components/SearchResultsCard";
import { CardSkeleton } from "@/shared/common";
import type { HotelFormDataT } from "@/types/hotel.type";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  // console.log(searchParams, "search");

  const {
    data: hotelData,
    isLoading,
    isSuccess,
  } = useSearchHotels(searchParams);
  console.log(hotelData?.pagination, "pagination");

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

  function handlePageChange(pageNumber: number) {
    setPage(pageNumber);
  }

  // console.log(hotelData);

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
        {isLoading && <CardSkeleton />}
        {isSuccess && (
          <div className="grid gap-4">
            {hotelData?.data.map((hotel: HotelFormDataT) => (
              <SearchResultsCard hotel={hotel} />
            ))}
          </div>
        )}

        {hotelData?.pagination && hotelData?.pagination?.total > 1 && (
          <div className="mx-auto my-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      !hotelData?.pagination.hasPreviousPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
                {Array.from(
                  { length: hotelData?.pagination?.pages },
                  (_, i) => i + 1
                ).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      !hotelData?.pagination.hasNextPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
