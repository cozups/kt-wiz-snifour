import { Carousel, CarouselApi, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui";
import { CarouselCard } from "@/features/game";
import useGetRecentMatchScheduleQuery from "@/features/game/apis/match-schedule/RecentScheduleApi.query";
import { useGetMatchScheduleQuery } from "@/features/game/apis/match-schedule/matchScheduleApi.query";
import { parseDate, selectTypeAndMonth } from "@/lib/helpers/parse-date";
import { useMatchStore } from "@/store/useMatchStore";
import { isValid, parse } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { MatchInfoCarouselSkeleton } from "../skeleton/MatchInfoCarouselSkeleton";

const MatchInfoCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { currentMonth, selectedDate } = useMatchStore();
  const { data: recentMatchData, isError, error, isLoading } = useGetRecentMatchScheduleQuery();

  // recentMonth 계산
  const recentMonth = useMemo(() => parseDate(recentMatchData?.current.gameDate?.toString()), [recentMatchData]);

  // type, queryMonth 결정
  const { type, queryMonth } = useMemo(
    () => selectTypeAndMonth(recentMonth, currentMonth),
    [recentMonth, currentMonth]
  );

  // 경기 일정 데이터
  const { matchData } = useGetMatchScheduleQuery({
    currentMonth: queryMonth,
    carouselApi,
    type,
  });

  // 날짜 선택 시 캐러셀 이동
  useEffect(() => {
    if (!selectedDate || !carouselApi || matchData.length === 0) return;

    const selectedIndex = matchData.findIndex((game) => {
      const parsedDate = parse(game.gameDate?.toString(), "yyyyMMdd", new Date());
      return isValid(parsedDate) && parsedDate.getTime() === selectedDate.getTime();
    });

    if (selectedIndex !== -1) {
      carouselApi.scrollTo(selectedIndex, true);
    }
  }, [selectedDate, matchData, carouselApi]);

  if (isError) {
    throw new Error(error?.toString());
  }

  if (isLoading) {
    return <MatchInfoCarouselSkeleton />;
  }

  const today = new Date();
  const hasUpcomingGames = matchData.some((game) => {
    const parsedDate = parse(game.gameDate?.toString(), "yyyyMMdd", new Date());
    return isValid(parsedDate) && parsedDate >= today;
  });

  return (
    <div className="w-full max-w-2xl min-w-full overflow:hidden">
      <Carousel setApi={(api) => setCarouselApi(api)} className="relative max-w-full">
        <CarouselContent className="-ml-1">
          {matchData.map((data, index) => (
            <CarouselCard key={`${data.gameDate}-${index}`} data={data} />
          ))}
          {!hasUpcomingGames && <CarouselCard data={null} />}
        </CarouselContent>
        <CarouselPrevious className="absolute border-none left-0 top-1/2 -translate-y-1/2 z-30 text-white hover:text-wiz-white hover:text-opacity-80 p-4 rounded-full" />
        <CarouselNext className="absolute border-none right-0 top-1/2 -translate-y-1/2 z-20 text-white hover:text-wiz-white hover:text-opacity-80 p-4 rounded-full" />
      </Carousel>
    </div>
  );
};

export { MatchInfoCarousel };
