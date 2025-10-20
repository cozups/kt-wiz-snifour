import { OverallBatterRank, OverallPitcherRank } from "@/features/common";
import {
  BatterRankingResponse,
  CrowdRank,
  CrowdRankingResponse,
  PitcherRankingResponse,
  TeamRankingResponse,
  TeamStats,
} from "@/features/game";
import { rankingApi } from "@/features/game/apis/ranking/rankingApi";
import { Parameter, UseQueryParams, isNotNullish } from "@/lib";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 랭킹 쿼리 키
export const RANKING_API_QUERY_KEY = {
  /* 팀 */
  GET_TEAM_RANKING: () => ["team-ranking"],
  GET_TEAM_RANKING_BY_PITCHER: () => ["team-ranking-by-pitcher"],
  GET_TEAM_RANKING_BY_BATTER: () => ["team-ranking-by-batter"],
  GET_TEAM_VS: () => ["team-vs"],

  /* 투수 */
  GET_PITCHER_ERA_TOP3: (params?: Parameter<typeof rankingApi.getPitcherEraTop3>) =>
    ["pitcher-era-top3", params].filter(isNotNullish),
  GET_PITCHER_WIN_TOP3: (params?: Parameter<typeof rankingApi.getPitcherWinTop3>) =>
    ["pitcher-win-top3", params].filter(isNotNullish),
  GET_KT_PITCHER_RANKING: (params?: Parameter<typeof rankingApi.getKTPitcherRanking>) =>
    ["ktpitcher-ranking", params].filter(isNotNullish),
  GET_ALL_PITCHER_RANKING: (params?: Parameter<typeof rankingApi.getAllPitcherRanking>) =>
    ["allpitcher-ranking", params].filter(isNotNullish),

  /* 타자 */
  GET_BATTER_HRA_TOP3: (params?: Parameter<typeof rankingApi.getBatterHraTop3>) =>
    ["batter-hra-top3", params].filter(isNotNullish),
  GET_BATTER_HR_TOP3: (params?: Parameter<typeof rankingApi.getBatterHrTop3>) =>
    ["batter-hr-top3", params].filter(isNotNullish),
  GET_KT_BATTER_RANKING: (params?: Parameter<typeof rankingApi.getKTBatterRanking>) =>
    ["ktbatter-ranking", params].filter(isNotNullish),
  GET_ALL_BATTER_RANKING: (params?: Parameter<typeof rankingApi.getAllBatterRanking>) =>
    ["allbatter-ranking", params].filter(isNotNullish),

  /* 관중 */
  GET_CROWD_RANKING: (params?: Parameter<typeof rankingApi.getCrowdRanking>) =>
    ["crowd-ranking", params].filter(isNotNullish),
};

/* 팀 */
export function useGetTeamRanking() {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_TEAM_RANKING(),
    queryFn: async () => {
      const response = await rankingApi.getTeamRank();
      return response.data.list;
    },
  });
}

export function useGetTeamRankingByPitcher() {
  return useQuery<TeamRankingResponse, AxiosError, TeamStats[], QueryKey>({
    queryKey: RANKING_API_QUERY_KEY.GET_TEAM_RANKING_BY_PITCHER(),
    queryFn: async () => {
      const response = await rankingApi.getTeamRankByPitcher();
      return response;
    },
    select: (data) => {
      return data.data.list.sort((a, b) => Number(a.era) - Number(b.era));
    },
  });
}

export function useGetTeamRankingByBatter() {
  return useQuery<TeamRankingResponse, AxiosError, TeamStats[], QueryKey>({
    queryKey: RANKING_API_QUERY_KEY.GET_TEAM_RANKING_BY_BATTER(),
    queryFn: async () => {
      const response = await rankingApi.getTeamRankByBatter();
      return response;
    },
    select: (data) => {
      return data.data.list.sort((a, b) => Number(b.hra) - Number(a.hra));
    },
  });
}

export function useGetTeamVS() {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_TEAM_VS(),
    queryFn: async () => {
      const response = await rankingApi.getTeamVs();
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
  });
}

/* 투수 */
export function useGetPitcherEraTop3(
  params?: UseQueryParams<typeof rankingApi.getPitcherEraTop3, AxiosError, PitcherRankingResponse, OverallPitcherRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_PITCHER_ERA_TOP3(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getPitcherEraTop3(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetPitcherWinTop3(
  params?: UseQueryParams<typeof rankingApi.getPitcherWinTop3, AxiosError, PitcherRankingResponse, OverallPitcherRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_PITCHER_WIN_TOP3(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getPitcherWinTop3(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetKTPitcherRanking(
  params?: UseQueryParams<
    typeof rankingApi.getKTPitcherRanking,
    AxiosError,
    PitcherRankingResponse,
    OverallPitcherRank[]
  >
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_KT_PITCHER_RANKING(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getKTPitcherRanking(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetAllPitcherRanking(
  params?: UseQueryParams<
    typeof rankingApi.getAllPitcherRanking,
    AxiosError,
    PitcherRankingResponse,
    OverallPitcherRank[]
  >
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_ALL_PITCHER_RANKING(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getAllPitcherRanking(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

/* 타자 */
export function useGetBatterHraTop3(
  params?: UseQueryParams<typeof rankingApi.getBatterHraTop3, AxiosError, BatterRankingResponse, OverallBatterRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_BATTER_HRA_TOP3(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getBatterHraTop3(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetBatterHrTop3(
  params?: UseQueryParams<typeof rankingApi.getBatterHrTop3, AxiosError, BatterRankingResponse, OverallBatterRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_BATTER_HR_TOP3(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getBatterHrTop3(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetKTBatterRanking(
  params?: UseQueryParams<typeof rankingApi.getKTBatterRanking, AxiosError, BatterRankingResponse, OverallBatterRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_KT_BATTER_RANKING(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getKTBatterRanking(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

export function useGetAllBatterRanking(
  params?: UseQueryParams<typeof rankingApi.getAllBatterRanking, AxiosError, BatterRankingResponse, OverallBatterRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_ALL_BATTER_RANKING(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getAllBatterRanking(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}

/* 관중 */
export function useGetCrowdRanking(
  params?: UseQueryParams<typeof rankingApi.getCrowdRanking, AxiosError, CrowdRankingResponse, CrowdRank[]>
) {
  return useQuery({
    queryKey: RANKING_API_QUERY_KEY.GET_CROWD_RANKING(params?.variables),
    queryFn: async () => {
      const response = await rankingApi.getCrowdRanking(params?.variables);
      return response;
    },
    select: (data) => {
      return data.data.list;
    },
    ...params?.options,
  });
}
