import { seasons } from "@/constants/seasons";
import { useSearchParams } from "react-router";
import data from "@/assets/data/__test__/mockRanking.json";
import { useQuery } from "@tanstack/react-query";
// import { rankingApi } from "../../apis/ranking/rankingApi";

export function useCrowdRank() {
  const [searchParams] = useSearchParams();

  const variables = { gyear: searchParams.get("gyear") || seasons[0] };

  return useQuery({
    queryKey: ["crowd-ranking", variables],
    queryFn: async () => {
      // const response = await rankingApi.getCrowdRanking(variables);
      // return response;
      return Promise.resolve({ data: { list: data.crowd.sort((a, b) => b.crowd - a.crowd) } });
    },
    select: (data) => {
      return data.data.list;
    },
  });
}
