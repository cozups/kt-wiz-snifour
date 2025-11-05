import { DataTable } from "@/features/common/components/table/DataTable";
import { CrowdRankingChart } from "./CrowdRankingChart";
import { crowdRankColumns } from "@/constants/columns/crowd-columns";
import { useCrowdRank } from "@/features/game/hooks/ranking";

export function CrowdRankingView() {
  const { data: ranking, isLoading, isError, error } = useCrowdRank();

  if (isError) {
    throw new Error(error?.toString());
  }

  return (
    <div>
      <CrowdRankingChart data={ranking || []} loading={isLoading} />
      <DataTable data={ranking || []} columns={crowdRankColumns} domain="all" isLoading={isLoading} />
    </div>
  );
}
