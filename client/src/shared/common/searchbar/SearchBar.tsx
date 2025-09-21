import { Plane } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  setAdultCount,
  setDestination,
  setChildCount,
  setCheckIn,
  setCheckOut,
} from "@/store/slices/searchSlice";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const { destination, adultCount, childCount, checkIn, checkOut } =
    useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  console.log(destination, "des");
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-orange-400 -mt-8 rounded-sm shadow-md p-3 grid grid-cols-2 lg:grid-cols-5  items-center gap-4"
    >
      <div className="flex items-end gap-2">
        <Plane size={"30px"} className="text-white pb-2" />
        <div className="space-y-2">
          <Label className="text-white">Search</Label>
          <Input
            placeholder="Find your destination..."
            className="text-md w-full focus:outline-none bg-white"
            value={destination}
            onChange={(e) => dispatch(setDestination(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="space-y-2">
          <Label className="text-white">Adults</Label>
          <Input
            className="text-md w-full focus:outline-none bg-white"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => dispatch(setAdultCount(parseInt(e.target.value)))}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Childs</Label>
          <Input
            className="text-md w-full focus:outline-none bg-white"
            type="number"
            min={1}
            max={20}
            value={childCount}
            onChange={(e) => dispatch(setChildCount(parseInt(e.target.value)))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Check In</Label>
        <DatePicker
          selected={checkIn}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-2 focus:outline-none rounded-md"
          wrapperClassName="min-w-full"
          onChange={(date) => dispatch(setCheckIn(date))}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Check Out</Label>
        <DatePicker
          selected={checkOut}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-white p-2 focus:outline-none rounded-md"
          wrapperClassName="min-w-full"
          onChange={(date) => dispatch(setCheckOut(date))}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Submit</Label>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-blue-700 text-white border border-blue-700 hover:bg-transparent hover:text-blue-700 cursor-pointer"
          >
            Search
          </Button>
          <Button
            type="button"
            className="bg-red-600 text-white  border border-red-700 hover:bg-transparent hover:text-red-600 cursor-pointer"
          >
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
