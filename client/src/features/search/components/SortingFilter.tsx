import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortingFilter = ({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      onValueChange={(value: string) => setSortOption(value)}
      value={sortOption}
    >
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue className="text-black" placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starRating">Star Rating</SelectItem>
        <SelectItem value="pricePerNightAsc">
          Price Per Night (low to high)
        </SelectItem>
        <SelectItem value="pricePerNightDesc">
          Price Per Night (high to low)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortingFilter;
