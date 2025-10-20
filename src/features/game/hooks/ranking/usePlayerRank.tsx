import { useMemo } from "react";

import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import { rankingApi } from "../../apis/ranking/rankingApi";
import data from "@/assets/data/__test__/mockRanking.json";
import { OverallBatterRank, OverallPitcherRank } from "@/features/common";

export function usePlayerRank(position: "pitcher" | "batter", domain: "kt" | "all") {
  const [searchParams] = useSearchParams();

  const variables = useMemo(() => {
    return {
      gyear: searchParams.get("gyear") || "2024",
      pname: "",
      sortKey: "ERA",
    };
  }, [searchParams]);

  return useQuery({
    queryKey: ["pitcher-ranking", { position, domain }, variables],
    queryFn: async () => {
      if (position === "pitcher") {
        if (domain === "kt") {
          // const response = await rankingApi.getKTPitcherRanking(variables);
          // return response;

          return Promise.resolve({ data: { list: data.ktPitcher } });
        }
        if (domain === "all") {
          // const response = await rankingApi.getAllPitcherRanking(variables);
          // return response;
          return Promise.resolve({ data: { list: data.allPitcher } });
        }
      }

      if (position === "batter") {
        if (domain === "kt") {
          // const response = await rankingApi.getKTBatterRanking(variables);
          // return response;
          return Promise.resolve({ data: { list: data.ktBatter } });
        }
        if (domain === "all") {
          // const response = await rankingApi.getAllBatterRanking(variables);
          // return response;
          return Promise.resolve({ data: { list: data.allBatter } });
        }
      }
    },
    select: (data) => {
      const list = data?.data?.list || [];
      return position === "pitcher" ? (list as OverallPitcherRank[]) : (list as OverallBatterRank[]);
    },
  });
}
