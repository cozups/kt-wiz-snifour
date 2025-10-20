import { teamRankColums } from "@/constants/columns/team-rank-colums";
import { DataTable } from "@/features/common";
// import { useTeamRank } from "@/features/game/hooks/ranking/useTeamRank";
import data from "@/assets/data/__test__/mockRanking.json";

function TeamRankingTable() {
  // const { ranking, isError, error, isLoading } = useTeamRank("team");

  // if (isError) {
  //   throw new Error(error?.toString());
  // }

  const ranking = data.team;
  const isLoading = false;

  return <DataTable data={ranking ?? []} columns={teamRankColums} domain="all" isLoading={isLoading} />;
}

export { TeamRankingTable };
