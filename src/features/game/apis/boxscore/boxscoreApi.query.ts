import { useQuery, useQueryClient } from '@tanstack/react-query';
import { boxscoreApi } from './boxscoreApi';

// 박스스코어 쿼리 키
export const BOXSCORE_QUERY_KEY = (gameDate: string, gmkey: string) => [
  'boxscore',
  gameDate,
  gmkey,
];

export const useGetBoxscoreQuery = (gameDate: string, gmkey: string) => {
  const queryClient = useQueryClient();

  const boxscoreQuery = useQuery({
    queryKey: BOXSCORE_QUERY_KEY(gameDate, gmkey),
    queryFn: () => boxscoreApi.getMatchData(gameDate, gmkey),
    enabled: !!gameDate && !!gmkey,
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
