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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const searchValues = useAppSelector((state) => state.search);

  const [selectedStar, setSelectStar] = useState<string[]>([]);
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
    stars: selectedStar,
    types: allHotelType,
    maxPrice: selectedMaxPrice?.toString(),
    facilities,
  };

  // fecth search hotels api
  const {
    data: hotelData,
    isLoading,
    isSuccess,
  } = useSearchHotels(searchParams);

  function handleStarChange(checked: string | boolean, star: string) {
    setSelectStar((prev: string[]) =>
      checked ? [...prev, star] : prev.filter((hotel) => hotel !== star)
    );
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-lg bg-white border border-gray-300 shadow-md h-fit sticky p-4">
        <FilterAll
          selectedStar={selectedStar}
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
        {hotelData?.data.length == 0 && (
          <h3 className="text-center font-bold my-8 text-2xl">
            No Hotel Found ! Try refresh
          </h3>
        )}
        {isSuccess && (
          <div className="grid gap-4">
            {hotelData?.data.map((hotel: HotelFormDataT) => (
              <SearchResultsCard hotel={hotel} />
            ))}
          </div>
        )}

        {hotelData?.pagination &&
          hotelData?.pagination?.total > 1 &&
          hotelData?.data.length > 0 && (
            <div className="mx-auto my-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={
                        !hotelData?.pagination.hasPreviousPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: hotelData?.pagination?.pages },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        className="cursor-pointer"
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
                          : "cursor-pointer"
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
