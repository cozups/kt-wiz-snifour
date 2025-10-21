import { ApiRoutes } from "@/constants/route";
import { BatterSeasonSummaryBase, PitcherSeasonSummaryBase, PlayerBase } from "@/features/player/types/detail";
import {
  CoachDetailResponse,
  CoachListResponse,
  PlayerDetailResponse,
  PlayerDto,
  PlayerListResponse,
} from "@/features/player/types/player";
import instance from "@/lib/axios/instance";

// mock data
import mockPitcherList from "@/assets/data/__test__/pitcherlist.json";
import mockCatcherList from "@/assets/data/__test__/catcherlist.json";
import mockInfielderList from "@/assets/data/__test__/infielderlist.json";
import mockOutfielderList from "@/assets/data/__test__/outfielderlist.json";

export const playerApi = {
  getCoachList: async (): Promise<CoachListResponse> => {
    const response = await instance.get(ApiRoutes.CoachList);
    return response.data;
  },
  getCoachDetail: async (params?: PlayerDto): Promise<CoachDetailResponse> => {
    const response = await instance.get(ApiRoutes.CoachDetail, { params });
    return response.data;
  },
  getPlayerList: async (params: PlayerDto): Promise<PlayerListResponse> => {
    const { position } = params;

    switch (position) {
      case "pitcher": {
        // const response = await instance.get(ApiRoutes.PitcherList);
        // return response.data;
        return { data: mockPitcherList };
      }
      case "catcher": {
        // const response = await instance.get(ApiRoutes.CatcherList);
        // return response.data;
        return { data: mockCatcherList };
      }
      case "infielder": {
        // const response = await instance.get(ApiRoutes.InfielderList);
        // return response.data;
        return { data: mockInfielderList };
      }
      case "outfielder": {
        // const response = await instance.get(ApiRoutes.OutfielderList);
        // return response.data;
        return { data: mockOutfielderList };
      }
      default: {
        return { data: [] };
      }
    }
  },
  getPlayerDetail: async (params: PlayerDto): Promise<PlayerDetailResponse> => {
    const { position, ...restParams } = params;

    switch (position) {
      case "pitcher": {
        const response = await instance.get(ApiRoutes.PitcherDetail, {
          params: restParams,
        });
        return response.data;
      }
      case "catcher": {
        const response = await instance.get(ApiRoutes.CatcherDetail, {
          params: restParams,
        });
        return response.data;
      }
      case "infielder": {
        const response = await instance.get(ApiRoutes.InfielderDetail, {
          params: restParams,
        });
        return response.data;
      }
      case "outfielder": {
        const response = await instance.get(ApiRoutes.OutfielderDetail, {
          params: restParams,
        });
        return response.data;
      }
      default: {
        return {
          data: {
            gameplayer: {} as PlayerBase,
            recentgamerecordlist: [],
            recentgamerecordlistfutures: [],
            seasonsummary: {} as PitcherSeasonSummaryBase | BatterSeasonSummaryBase,
            seasonsummaryfutures: {} as PitcherSeasonSummaryBase | BatterSeasonSummaryBase,
            yearrecordlist: [],
          },
        };
      }
    }
  },
};
