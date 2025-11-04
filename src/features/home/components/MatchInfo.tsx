import { useEffect, useState } from "react";
import { Link } from "react-router";

import useGetRecentMatchScheduleQuery from "@/features/game/apis/match-schedule/RecentScheduleApi.query";
import { cn } from "@/lib/utils";
import MatchInfoCard from "./MatchInfoCard";
import RecentMatches from "./RecentMatches";
import { TeamRanking } from "./TeamRanking";
import { useGetBoxscoreQuery } from "@/features/game/apis/boxscore/boxscoreApi.query";

function MatchInfo() {
  const [_gameDate, setGameDate] = useState<string | undefined>(undefined);
  const [_gameKey, setGameKey] = useState<string | undefined>(undefined);
  const {
    data: recentMatchData,
    isLoading: recentLoading,
    error: recentError,
    isSuccess: recentSuccess,
  } = useGetRecentMatchScheduleQuery();

  const {
    data: boxscoreData,
    isLoading: boxscoreLoading,
    error: boxscoreError,
    prefetchBoxscoreQuery,
  } = useGetBoxscoreQuery();

  if (recentError || boxscoreError) {
    throw new Error((recentError || boxscoreError)?.toString());
  }

  useEffect(() => {
    if (recentSuccess) {
      setGameDate(recentMatchData?.current.displayDate);
      setGameKey(recentMatchData?.current.gmkey);
    }
  }, [recentSuccess, recentMatchData]);

  const handlePrevDay = () => {
    if (!boxscoreData?.schedule.prev) return;
    setGameDate(boxscoreData.schedule.prev.gameDate.toString());
    setGameKey(boxscoreData.schedule.prev.gmkey);
  };

  const handleNextDay = () => {
    if (!boxscoreData?.schedule.next) return;
    setGameDate(boxscoreData.schedule.next.gameDate.toString());
    setGameKey(boxscoreData.schedule.next.gmkey);
  };

  return (
    <>
      <div
        className={cn(
          "w-full h-fit flex flex-col items-start rounded-3xl overflow-hidden bg-white",
          "md:h-96 md:flex-row",
          "lg:h-[500px]"
        )}
      >
        <MatchInfoCard>
          <MatchInfoCard.Header
            match={boxscoreData?.schedule}
            handlePrevDay={handlePrevDay}
            handleNextDay={handleNextDay}
            prefetch={prefetchBoxscoreQuery}
            loading={recentLoading || boxscoreLoading}
          />
          <MatchInfoCard.Content match={boxscoreData?.schedule.current} loading={recentLoading || boxscoreLoading} />
        </MatchInfoCard>
        {/* 사이드 */}
        <div className={cn("w-full h-40 flex", "md:w-[25%] md:border-l md:flex-col md:h-full")}>
          <TeamRanking />
          <RecentMatches match={boxscoreData?.schedule.current} />
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <Link
          to="/game/regular/schedule"
          className={cn(
            "rounded bg-white bg-opacity-10 text-white hover:bg-opacity-100 hover:text-black text-xs px-2 py-1 transition-colors duration-300",
            "lg:text-base lg:px-4 lg:py-2"
          )}
        >
          더 많은 경기보기
        </Link>
      </div>
    </>
  );
}

export { MatchInfo };
