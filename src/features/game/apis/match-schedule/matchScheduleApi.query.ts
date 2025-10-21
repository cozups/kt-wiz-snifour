import { CarouselApi } from "@/components/ui";
import { GameSchedule } from "@/features/game";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addMonths, format, subMonths } from "date-fns";
import { useEffect } from "react";
// import { scheduleApi } from "./matchScheduleApi";
import data from "@/assets/data/__test__/mockGames.json";

interface UseMatchScheduleQueryParams {
  currentMonth: Date;
  carouselApi?: CarouselApi | null;
  type?: "kt" | "all" | "recent";
}

// 경기 일정 쿼리 키
export const MATCH_SCHEDULE_QUERY_KEY = {
  GET_SCHEDULE: (yearMonth: string) => ["matchSchedule", yearMonth],
};

// 경기 일정
export const useGetMatchScheduleQuery = ({ currentMonth, carouselApi, type = "kt" }: UseMatchScheduleQueryParams) => {
  const queryClient = useQueryClient();

  const yearMonth = format(currentMonth, "yyyyMM");
  const prevMonth = subMonths(currentMonth, 1);
  const nextMonth = addMonths(currentMonth, 1);

  // 호출할 함수 선택
  const fetchFn =
    type !== "all"
      ? async (yearMonth: string): Promise<GameSchedule[]> => {
          // const response = await scheduleApi.getMonthSchedule(yearMonth);
          // return response.data.list;
          return Promise.resolve(data.ktmatches);
        }
      : async (yearMonth: string): Promise<GameSchedule[]> => {
          // const response = await scheduleApi.getAllMonthSchedule(yearMonth);
          // return response.data.list;
          return Promise.resolve(data.allmatches);
        };

  // 현재 달 데이터 가져오기
  const {
    data: currentData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<GameSchedule[], Error>({
    queryKey: MATCH_SCHEDULE_QUERY_KEY.GET_SCHEDULE(`${type}-${yearMonth}`),
    queryFn: () => fetchFn(yearMonth),
    staleTime: 5 * 60 * 1000,
  });

  // 현재 달 첫 번째 경기 | 마지막 경기로 이동
  useEffect(() => {
    if (carouselApi) {
      if (type === "recent") {
        carouselApi.scrollTo(currentData.length - 1, true); // 마지막 인덱스
      } else {
        carouselApi.scrollTo(0, true); // 첫 번째 인덱스
      }
    }
  }, [carouselApi, currentData, type]);

  // 이전, 다음 달 데이터 프리패칭
  useEffect(() => {
    const prevKey = MATCH_SCHEDULE_QUERY_KEY.GET_SCHEDULE(`${type}-${format(prevMonth, "yyyyMM")}`);
    const nextKey = MATCH_SCHEDULE_QUERY_KEY.GET_SCHEDULE(`${type}-${format(nextMonth, "yyyyMM")}`);

    queryClient.prefetchQuery({
      queryKey: prevKey,
      queryFn: () => fetchFn(format(prevMonth, "yyyyMM")),
    });
    queryClient.prefetchQuery({
      queryKey: nextKey,
      queryFn: () => fetchFn(format(nextMonth, "yyyyMM")),
    });
  }, [queryClient, prevMonth, nextMonth, type, fetchFn]);

  return { matchData: currentData, isLoading, isSuccess, isError, error };
};
