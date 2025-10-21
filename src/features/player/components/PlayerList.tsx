import { SearchBar } from "@/features/common";
import { CoachListItem, PlayerListItem } from "@/features/player/types/list";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { usePlayerSearch } from "../hooks/usePlayerSearch";
import { NotFoundSearch } from "./NotFoundSearch";

const PlayerList = () => {
  const { data: filteredPlayerList, isLoading, isError, error, searchWord, handleSearch } = usePlayerSearch();
  const navigate = useNavigate();

  if (isError) {
    throw new Error(error?.message);
  }

  if (!filteredPlayerList || filteredPlayerList?.length === 0) {
    return <NotFoundSearch />;
  }

  const handlePlayerClick = (player: CoachListItem | PlayerListItem) => {
    navigate(`detail?pcode=${player.pcode}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, player: PlayerListItem | CoachListItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePlayerClick(player);
    }
  };

  const skeletonItems = Array.from({ length: 16 });

  return (
    <div className="min-h-screen">
      <SearchBar value={searchWord} onSubmit={handleSearch} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {isLoading || filteredPlayerList.length <= 0
          ? // 로딩중일 때 스켈레톤
            skeletonItems.map(() => (
              <div key={Math.random()} className="relative bg-gray-200 animate-pulse rounded-lg shadow-md">
                <Skeleton height={200} width="100%" />
              </div>
            ))
          : // 컴포넌트
            filteredPlayerList.map((player) => (
              <div
                key={player.pcode}
                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handlePlayerClick(player)}
                onKeyDown={(event) => handleKeyDown(event, player)}
                tabIndex={0}
                role="button"
                aria-label={`Player ${player.playerName}, No.${player.backnum}`}
              >
                <div className="absolute top-2 right-2 text-right text-wiz-red font-bold text-xs md:text-base lg:text-lg">
                  <p>No.{player.backnum}</p>
                  <p className="text-wiz-black">{player.playerName}</p>
                </div>
                <img src={player.playerPrvwImg} alt={player.playerName} className="w-full aspect-square object-cover" />
              </div>
            ))}
      </div>
    </div>
  );
};

export { PlayerList };
