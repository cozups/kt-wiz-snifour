import { useQuery } from "@tanstack/react-query";
// import { watchPointApi } from "./watchPointApi";
import useGetRecentMatchScheduleQuery from "../match-schedule/RecentScheduleApi.query";
import data from "@/assets/data/__test__/mockGames.json";

// 관전포인트 쿼리 키
export const WATCH_POINT_QUERY_KEY = (gameDate: string, gamekey: string) => ["watchPoint", gameDate, gamekey];

const useGetWatchPointQuery = (gameDate?: string, gamekey?: string) => {
  const { data: recentMatchData } = useGetRecentMatchScheduleQuery();

  const queryGameDate = gameDate || recentMatchData?.current.gameDate.toString() || "";
  const queryGameKey = gamekey || recentMatchData?.current.gmkey || "";

  const {
    data: watchData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: WATCH_POINT_QUERY_KEY(queryGameDate, queryGameKey),
    queryFn: async () => {
      // const response = await watchPointApi.getWatchPoint(queryGameDate, queryGameKey);
      // return response;
      return Promise.resolve(data.watchpoint);
    },
    enabled: !!queryGameDate && !!queryGameKey,
    staleTime: 5 * 60 * 1000,
  });

  return { watchData, loading, error: error?.message || null };
};

export default useGetWatchPointQuery;
