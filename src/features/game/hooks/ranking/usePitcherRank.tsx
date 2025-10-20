import { useMemo } from "react";

import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import { rankingApi } from "../../apis/ranking/rankingApi";
import data from "@/assets/data/__test__/mockRanking.json";

export function usePitcherRank(domain: "kt" | "all") {
  const [searchParams] = useSearchParams();

  const variables = useMemo(() => {
    return {
      gyear: searchParams.get("gyear") || "2024",
      pname: "",
      sortKey: "ERA",
    };
  }, [searchParams]);

  return useQuery({
    queryKey: ["pitcher-ranking", domain, variables],
    queryFn: async () => {
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
    },
    select: (data) => {
      return data?.data?.list || [];
    },
  });
}
