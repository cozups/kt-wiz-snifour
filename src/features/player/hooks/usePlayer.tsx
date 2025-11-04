import { PLAYER_API_QUERY_KEY } from "@/features/player/apis/playerApi.query";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
// import { playerApi } from "../apis/playerApi";

import pitcherData from "@/assets/data/__test__/pitcher/강건.json";
import batterData from "@/assets/data/__test__/infielder/강백호.json";
export const usePlayer = () => {
  const { position } = useParams();
  const [searchParams] = useSearchParams();
  const pcode = searchParams.get("pcode") ?? "";

  const variables = {
    position,
    pcode,
  };

  return useQuery({
    queryKey: PLAYER_API_QUERY_KEY.GET_PLAYER_DETAIL(variables),
    queryFn: async () => {
      // const response = await playerApi.getPlayerDetail(variables);
      // return response;
      if (position === "pitcher") {
        return pitcherData;
      }
      return batterData;
    },
    select: (data) => {
      return data.data;
    },
    enabled: !!position && !!pcode,
  });
};
