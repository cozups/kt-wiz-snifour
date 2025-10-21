import { useMatchStore } from "@/store/useMatchStore";
import { useQuery } from "@tanstack/react-query";
import { isValid, parse } from "date-fns";
import { scheduleApi } from "./matchScheduleApi";

// 최근 경기 쿼리 키
export const RECENT_MATCHES_QUERY_KEY = ["recentMatches"];

const useGetRecentMatchScheduleQuery = () => {
  const { setRecentMonth } = useMatchStore();

  const fetchFn = async () => {
    const response = await scheduleApi.getRecentSchedule();

    if (response?.data?.current.gameDate) {
      // gameDate를 Date 객체로 변환
      const parsedDate = parse(String(response.data.current.gameDate), "yyyyMMdd", new Date());

      if (isValid(parsedDate)) {
        setRecentMonth(parsedDate);
      } else {
        console.error("날짜 형식 확인 ==> ", response.data.current.gameDate);
      }
    }

    return response;
  };

  return useQuery({
    queryKey: RECENT_MATCHES_QUERY_KEY,
    queryFn: fetchFn,
    select: (data) => {
      return data.data;
    },
    staleTime: 30 * 60 * 1000,
    retry: 2,
  });
};

export default useGetRecentMatchScheduleQuery;
