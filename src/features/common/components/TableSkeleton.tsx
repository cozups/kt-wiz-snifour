import Skeleton from "react-loading-skeleton";

export function TableSkeleton() {
  return (
    <div>
      <Skeleton baseColor="#d1d5db" className="w-full h-8 md:h-10 lg:h-12" count={10} />
    </div>
  );
}
