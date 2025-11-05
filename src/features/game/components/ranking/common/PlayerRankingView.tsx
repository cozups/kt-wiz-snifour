import { useSearchParams } from "react-router";
import { PlayerScatterChart } from "../common/chart/PlayerScatterChart";
import { OverallBatterRank, OverallPitcherRank, SortableTable } from "@/features/common";
import { Filter } from "../common/Filter";
import { batterColumns, pitcherColumns } from "@/constants/columns/player-rank-colums";
import { usePlayerRank } from "@/features/game/hooks/ranking/usePlayerRank";

export function PlayerRankingView({ position, domain }: { position: "pitcher" | "batter"; domain: "kt" | "all" }) {
  const { data: ranking, isLoading, error, isError } = usePlayerRank(position, domain);
  const [searchParams] = useSearchParams();
  const pname = searchParams.get("pname");

  if (isError) {
    throw new Error(error?.toString());
  }

  const filteredRanking = pname ? ranking?.filter((player) => player.playerName === pname) : ranking;

  return (
    <div className="flex flex-col">
      <PlayerScatterChart data={ranking || []} position={position} loading={isLoading} />
      <Filter />
      {position === "pitcher" ? (
        <SortableTable<OverallPitcherRank>
          data={filteredRanking as OverallPitcherRank[]}
          columns={pitcherColumns}
          loading={isLoading}
          domain={domain}
        />
      ) : (
        <SortableTable<OverallBatterRank>
          data={filteredRanking as OverallBatterRank[]}
          columns={batterColumns}
          loading={isLoading}
          domain={domain}
        />
      )}
    </div>
  );
}
