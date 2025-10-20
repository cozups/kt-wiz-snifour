import { TeamRankingPitcherConfig } from "@/constants/chart-config";
import { teamPitcherRankColumns } from "@/constants/columns/team-rank-colums";
import { TeamPitcherRank } from "@/features/common";
import { TeamRankingView } from "@/features/game";
// import { useTeamRank } from "@/features/game/hooks/ranking/useTeamRank";

import data from "@/assets/data/__test__/mockRanking.json";

function TeamPitcherRankingView() {
  // const { ranking, isLoading, isError, error } = useTeamRank("pitcher");

  // if (isError) {
  //   throw new Error(error?.toString());
  // }

  const ranking = data.teamPitcher.sort((a, b) => Number(a.era) - Number(b.era));
  const isLoading = false;

  return (
    <div>
      <p className="text-neutral-400">ERA 비교 순위입니다.</p>
      <TeamRankingView
        tableData={(ranking as TeamPitcherRank[]) ?? []}
        chartData={(ranking as TeamPitcherRank[]) ?? []}
        columns={teamPitcherRankColumns}
        chartConfig={TeamRankingPitcherConfig}
        isLoading={isLoading}
        domain="all"
      />
    </div>
  );
}

export { TeamPitcherRankingView };
