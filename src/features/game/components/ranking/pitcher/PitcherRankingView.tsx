import { usePitcherRank } from "@/features/game/hooks/ranking/usePitcherRank";
import { useSearchParams } from "react-router";
import { PlayerScatterChart } from "../common/chart/PlayerScatterChart";
import { SortableTable } from "@/features/common";
import { Filter } from "../common/Filter";
import { pitcherColumns } from "@/constants/columns/player-rank-colums";

export function PitcherRankingView({ domain }: { domain: "kt" | "all" }) {
  const { data: ranking, isLoading, error, isError } = usePitcherRank(domain);
  const [searchParams] = useSearchParams();
  const pname = searchParams.get("pname");

  if (isError) {
    throw new Error(error?.toString());
  }

  const filteredRanking = pname ? ranking?.filter((player) => player.playerName === pname) : ranking;

  return (
    <div className="flex flex-col">
      <PlayerScatterChart data={ranking || []} position="pitcher" loading={isLoading} />
      <Filter />
      <SortableTable data={filteredRanking || []} columns={pitcherColumns} loading={isLoading} domain={domain} />
    </div>
  );
}
