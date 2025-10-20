import { TeamRankingBatterConfig } from "@/constants/chart-config";
import { teamBatterRankColumns } from "@/constants/columns/team-rank-colums";
import { TeamBatterRank } from "@/features/common";
import { TeamRankingView } from "@/features/game";
// import { useTeamRank } from "@/features/game/hooks/ranking/useTeamRank";
import data from "@/assets/data/__test__/mockRanking.json";

function TeamBatterRankingView() {
  // const { ranking, isLoading, isError, error } = useTeamRank("batter");

  // if (isError) {
  //   throw new Error(error?.toString());
  // }

  const ranking = data.teamBatter.sort((a, b) => Number(b.hra) - Number(a.hra));
  const isLoading = false;

  return (
    <>
      <p className="text-neutral-400">타율 비교 순위입니다.</p>
      <TeamRankingView
        tableData={ranking as TeamBatterRank[]}
        chartData={ranking as TeamBatterRank[]}
        columns={teamBatterRankColumns}
        chartConfig={TeamRankingBatterConfig}
        isLoading={isLoading}
        domain="all"
      />
    </>
  );
}

export { TeamBatterRankingView };
