import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import { rankingApi } from "../../apis/ranking/rankingApi";
import data from "@/assets/data/__test__/mockRanking.json";

export function useTopPlayer(position: "pitcher" | "batter", indicator: "era" | "w" | "hra" | "hr") {
  const [searchParams] = useSearchParams();
  const variables = {
    gyear: searchParams.get("gyear") || "2024",
  };

  return useQuery({
    queryKey: ["top-player", { position, indicator, ...variables }],
    queryFn: async () => {
      if (position === "pitcher" && indicator === "era") {
        // const response = await rankingApi.getPitcherEraTop3(variables);
        // return response;
        return Promise.resolve({ data: { list: data.eraTop3 } });
      }

      if (position === "pitcher" && indicator === "w") {
        // const response = await rankingApi.getPitcherWinTop3(variables);
        // return response;
        return Promise.resolve({ data: { list: data.winTop3 } });
      }

      if (position === "batter" && indicator === "hra") {
        // const response = await rankingApi.getBatterHraTop3(variables);
        // return response;
        return Promise.resolve({ data: { list: data.hraTop3 } });
      }

      if (position === "batter" && indicator === "hr") {
        // const response = await rankingApi.getBatterHrTop3(variables);
        // return response;
        return Promise.resolve({ data: { list: data.hrTop3 } });
      }
    },
    select: (data) => {
      return data?.data?.list || [];
    },
  });
}
