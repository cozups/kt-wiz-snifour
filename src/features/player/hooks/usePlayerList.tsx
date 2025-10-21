import { PLAYER_API_QUERY_KEY } from "@/features/player/apis/playerApi.query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { playerApi } from "../apis/playerApi";

export const usePlayerList = () => {
  const { position } = useParams();
  const variables = {
    position,
  };

  return useQuery({
    queryKey: PLAYER_API_QUERY_KEY.GET_PLAYER_LIST(variables),
    queryFn: async () => {
      const response = await playerApi.getPlayerList(variables);
      return response.data;
    },
  });
};
