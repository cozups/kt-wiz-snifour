import { useQuery, useQueryClient } from "@tanstack/react-query";
import { boxscoreApi } from "./boxscoreApi";
import { useParams } from "react-router";
import useGetRecentMatchScheduleQuery from "../match-schedule/RecentScheduleApi.query";

import data from "@/assets/data/__test__/mockGames.json";

// 박스스코어 쿼리 키
export const BOXSCORE_QUERY_KEY = (gameDate: string, gmkey: string) => ["boxscore", gameDate, gmkey];

export const useGetBoxscoreQuery = () => {
  const queryClient = useQueryClient();
  const { gameDate, gameKey } = useParams<{
    gameDate: string;
    gameKey: string;
  }>();

  const { data: recentMatchData } = useGetRecentMatchScheduleQuery();

  const queryGameDate = gameDate || recentMatchData?.current.displayDate || "";
  const queryGameKey = gameKey || recentMatchData?.current.gmkey || "";

  const boxscoreQuery = useQuery({
    queryKey: BOXSCORE_QUERY_KEY(queryGameDate, queryGameKey),
    queryFn: () => {
      // const response = boxscoreApi.getMatchData(queryGameDate, queryGameKey);
      // return response;
      return data.boxscore;
    },
    enabled: !!queryGameDate && !!queryGameKey,
    staleTime: 5 * 60 * 1000, //5분
  });

  const prefetchBoxscoreQuery = (gameDate: string, gmkey: string) => {
    if (gameDate.length === 0 || gmkey.length === 0) return;
    queryClient.prefetchQuery({
      queryKey: BOXSCORE_QUERY_KEY(gameDate, gmkey),
      queryFn: () => boxscoreApi.getMatchData(gameDate, gmkey),
    });
  };

  return { ...boxscoreQuery, prefetchBoxscoreQuery };
};
