import { useGetWizRank } from "@/features/home/apis/mainApi.query";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

function TeamRanking() {
  const { data, isLoading, isError, error } = useGetWizRank();

  if (isError) {
    throw error;
  }

  return (
    <div
      className={cn(
        "w-[40%] flex flex-col gap-2 items-end bg-wiz-red text-white px-2 py-2",
        "md:w-full md:h-[25%] md:justify-between md:flex-row md:gap-2 md:pr-4 md:py-4",
        "lg:gap-8"
      )}
    >
      {/* 이미지 및 순위 */}
      {isLoading ? (
        <div className={cn("w-20 h-20", "md:w-18 md:h-18", "lg:w-24 lg:h-24")}>
          <Skeleton className={cn("w-full h-full")} baseColor="#d1d5db" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center relative">
          <img
            src="/assets/main/img-score@2x.png"
            alt=""
            className={cn(
              "w-20",
              "md:w-18 md:translate-x-2 md:-translate-y-2",
              "lg:w-24 lg:translate-x-3 lg:-translate-y-3"
            )}
          />
          <div
            className={cn(
              "absolute -bottom-1 right-4 px-1 bg-white text-wiz-red rounded-full font-extrabold text-[0.6rem]",
              "md:right-0 md:bottom-0",
              "lg:text-base lg:px-2"
            )}
          >
            {data?.rankName}
          </div>
        </div>
      )}

      {/* 성적 */}
      <div className={cn("flex flex-col items-end gap-1", "lg:gap-4")}>
        {isLoading ? (
          <Skeleton className={cn("w-28 h-6", "lg:w-36 lg:h-8")} baseColor="#d1d5db" />
        ) : (
          <p className={cn("font-extrabold text-base break-keep", "md:text-base", "lg:text-2xl")}>{data?.wldName}</p>
        )}
        <div className={cn("flex items-center gap-2 font-bold text-[0.6rem]", "lg:text-xs")}>
          {isLoading ? (
            <Skeleton className={cn("w-20 h-3", "lg:w-28 lg:h-3")} />
          ) : (
            <>
              <p>총 {data?.game}경기</p>
              <p>승률 {data?.wra}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { TeamRanking };
