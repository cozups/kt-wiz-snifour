import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { PLAYER_API_QUERY_KEY } from "../apis/playerApi.query";
import { playerApi } from "../apis/playerApi";

function usePlayerSearch() {
  const { position } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchWord = searchParams.get("searchWord") || "";

  const handleSearch = (searchWord: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      searchWord,
    });
  };

  const playerQuery = useQuery({
    queryKey: PLAYER_API_QUERY_KEY.GET_PLAYER_LIST({ position }),
    queryFn: async () => {
      const response = await playerApi.getPlayerList({ position });
      return response.data;
    },
    select: (data) => {
      const filteredPlayerList = data?.filter((player) =>
        player.playerName.toLowerCase().includes(searchWord.toLowerCase())
      );
      return filteredPlayerList;
    },
  });

  return {
    ...playerQuery,
    searchWord,
    handleSearch,
  };
}

export { usePlayerSearch };
