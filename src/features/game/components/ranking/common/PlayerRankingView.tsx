import { useSearchParams } from "react-router";
import { OverallBatterRank, OverallPitcherRank } from "@/features/common";
import { Filter } from "../common/Filter";
import { batterColumns, pitcherColumns } from "@/constants/columns/player-rank-colums";
import { usePlayerRank } from "@/features/game/hooks/ranking/usePlayerRank";
import { SortableTable } from "@/features/common/components/table/SortableTable";
import { lazy, Suspense } from "react";

const PlayerScatterChart = lazy(() =>
  import("../common/chart/PlayerScatterChart").then((module) => ({ default: module.PlayerScatterChart }))
);

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
      <Suspense fallback={<div className="w-full h-72 bg-transparent" />}>
        <PlayerScatterChart data={ranking || []} position={position} loading={isLoading} />
      </Suspense>
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
