import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      {[1, 2, 3].map((item) => (
        <Skeleton key={item} className="h-[190px] w-full rounded-xl" />
      ))}
    </div>
  );
};

export default CardSkeleton;
