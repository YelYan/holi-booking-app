import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { hotelFacilities, hotelTypes } from "@/shared/constants";

type SingleValueChangeHandler = (value: string) => void;

type MultiSelectChangeHandler = (
  checked: boolean | string,
  value: string
) => void;

type FilterAllProps = {
  facilities: string[];
  allHotelType: string[];
  handleStarChange: SingleValueChangeHandler;
  handleMaxPriceChange: SingleValueChangeHandler;
  handlefacilitiesChange: MultiSelectChangeHandler;
  handleHotelTypeChange: MultiSelectChangeHandler;
};

const FilterAll = ({
  allHotelType,
  facilities,
  handleStarChange,
  handlefacilitiesChange,
  handleHotelTypeChange,
  handleMaxPriceChange,
}: FilterAllProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
        Filter By:
      </h3>
      {/* star rating Filter */}
      <div className="grid gap-3">
        <Label>Rate stars</Label>
        <Select onValueChange={handleStarChange}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue className="text-black" placeholder="Star Rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((star) => (
              <div className="" key={star}>
                <SelectItem value={star.toString()}>{star}</SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Hotel types Filter */}
      <div className="grid gap-3">
        <Label>Hotel Types</Label>
        <div className="grid grid-cols-2 gap-2">
          {hotelTypes.map((hotel: string) => {
            return (
              <Label key={hotel}>
                <Checkbox
                  value={hotel}
                  checked={allHotelType.includes(hotel)}
                  onCheckedChange={(checked) =>
                    handleHotelTypeChange(checked, hotel)
                  }
                />
                <span className="font-light">{hotel}</span>
              </Label>
            );
          })}
        </div>
      </div>
      {/* Facilities Filter */}
      <div className="grid gap-3">
        <Label>Facilities</Label>
        <div className="grid grid-cols-2 gap-2">
          {hotelFacilities.map((facility: string) => {
            return (
              <Label key={facility}>
                <Checkbox
                  value={facility}
                  checked={facilities.includes(facility)}
                  onCheckedChange={(checked) =>
                    handlefacilitiesChange(checked, facility)
                  }
                />
                <span className="font-light">{facility}</span>
              </Label>
            );
          })}
        </div>
      </div>
      {/* Max Price Filter */}
      <div className="grid gap-3">
        <Label>Max Price</Label>
        <Select onValueChange={handleMaxPriceChange}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue className="text-black" placeholder="Max Price" />
          </SelectTrigger>
          <SelectContent>
            {[50, 100, 200, 300, 500].map((maxprice) => (
              <div className="" key={maxprice}>
                <SelectItem value={maxprice.toString()}>{maxprice}</SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterAll;
