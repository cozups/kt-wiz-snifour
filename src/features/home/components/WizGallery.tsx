import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import { useGetMainWizPhoto } from "@/features/home/apis/mainApi.query";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";
import { WizGalleryAnimationItem } from "./WizGalleryAnimationItem";

function WizGallery() {
  const {
    data: photos,
    isLoading,
    isError,
    error,
  } = useGetMainWizPhoto({
    variables: {
      count: 10,
    },
  });

  if (isError) {
    throw new Error(error?.toString());
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 3 }).map(() => (
              <CarouselItem className={cn("md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out")}>
                <Skeleton className="w-full h-[36rem] rounded-xl" baseColor="#d1d5db" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  if (!photos || !photos.length) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 3 }).map(() => (
                  <CarouselItem
                    className={cn("md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out")}
                  >
                    <Skeleton className="w-full h-[36rem] rounded-xl" baseColor="#d1d5db" />
                  </CarouselItem>
                ))
              : photos.map((photo, index) => (
                  <WizGalleryAnimationItem key={photo.artcSeq} photo={photo} index={index} />
                ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex items-center justify-center my-4">
        <Link
          to="/media/photos/1"
          className={cn(
            "rounded bg-white bg-opacity-10 text-white hover:bg-opacity-100 hover:text-black text-xs px-2 py-1 transition-colors duration-300",
            "lg:text-base lg:px-4 lg:py-2"
          )}
        >
          더 많은 사진보기
        </Link>
      </div>
    </>
  );
}

export { WizGallery };
