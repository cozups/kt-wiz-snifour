import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Skeleton from "react-loading-skeleton";

export function MatchInfoCarouselSkeleton() {
  return (
    <div className="w-full max-w-2xl min-w-full overflow:hidden">
      <Carousel className="relative max-w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={`skeleton-${index}`}
              className={"pl-1 md:basis-1/2 lg:basis-1/3 transition-transform duration-300 w-fit"}
            >
              <Skeleton className="w-full h-60" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
