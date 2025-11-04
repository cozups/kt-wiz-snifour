import { ApiRoutes } from "@/constants/route";
import instance from "@/lib/axios/instance";

import {
  BatterRankingResponse,
  CrowdRankingResponse,
  PitcherRankingResponse,
  RankingDto,
  TeamRankingResponse,
  TeamVSResponse,
} from "@/features/game";

import mockRanking from "@/assets/data/__test__/mockRanking.json";

// ranking api
export const rankingApi = {
  // 팀
  getTeamRank: async (): Promise<TeamRankingResponse> => {
    const response = await instance.get(ApiRoutes.teamRank);
    return response.data;
  },
  getTeamRankByPitcher: async (): Promise<TeamRankingResponse> => {
    const response = await instance.get(ApiRoutes.teamRankByPitcher);
    return response.data;
  },
  getTeamRankByBatter: async (): Promise<TeamRankingResponse> => {
    const response = await instance.get(ApiRoutes.teamRankByBatter);
    return response.data;
  },
  getTeamVs: async (): Promise<TeamVSResponse> => {
    const response = await instance.get(ApiRoutes.teamVs);
    return response.data;
  },

  // 투수
  getPitcherEraTop3: async (params?: RankingDto): Promise<PitcherRankingResponse> => {
    const response = await instance.get(ApiRoutes.PitcherEraTop3, { params });
    return response.data;
  },
  getPitcherWinTop3: async (params?: RankingDto): Promise<PitcherRankingResponse> => {
    const response = await instance.get(ApiRoutes.PitcherWinTop3, { params });
    return response.data;
  },
  getKTPitcherRanking: async (params?: RankingDto): Promise<PitcherRankingResponse> => {
    // const response = await instance.get(ApiRoutes.KtPitcherRank, { params });
    // return response.data;
    return Promise.resolve({ data: { list: mockRanking.ktPitcher } });
  },
  getAllPitcherRanking: async (params?: RankingDto): Promise<PitcherRankingResponse> => {
    const response = await instance.get(ApiRoutes.AllPitcherRank, { params });
    return response.data;
  },

  // 타자
  getBatterHraTop3: async (params?: RankingDto): Promise<BatterRankingResponse> => {
    const response = await instance.get(ApiRoutes.BatterHraTop3, { params });
    return response.data;
  },
  getBatterHrTop3: async (params?: RankingDto): Promise<BatterRankingResponse> => {
    const response = await instance.get(ApiRoutes.BatterHrTop3, { params });
    return response.data;
  },
  getKTBatterRanking: async (params?: RankingDto): Promise<BatterRankingResponse> => {
    // const response = await instance.get(ApiRoutes.KTBatterRank, { params });
    // return response.data;
    return Promise.resolve({ data: { list: mockRanking.ktBatter } });
  },
  getAllBatterRanking: async (params?: RankingDto): Promise<BatterRankingResponse> => {
    const response = await instance.get(ApiRoutes.AllBatterRank, { params });
    return response.data;
  },

  // 관중
  getCrowdRanking: async (params?: RankingDto): Promise<CrowdRankingResponse> => {
    const response = await instance.get(ApiRoutes.CrowdRank, { params });
    return response.data;
  },
};
