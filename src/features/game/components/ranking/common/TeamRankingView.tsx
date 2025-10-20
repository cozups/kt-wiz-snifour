import { CustomBarChart, DataTable, TeamBatterRank, TeamPitcherRank } from "@/features/common";
import { Config } from "@/features/player";
import { RecentRecord, YearRecord } from "@/features/player/types/detail";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface TeamRankingViewProps<T> {
  tableData: T[];
  chartData: RecentRecord[] | YearRecord[] | TeamPitcherRank[] | TeamBatterRank[];
  columns: ColumnDef<T>[];
  chartConfig: Config;
  isLoading?: boolean;
  domain: "kt" | "all" | undefined;
}

function TeamRankingView<T>({
  tableData,
  chartData,
  columns,
  chartConfig,
  isLoading = false,
  domain,
}: TeamRankingViewProps<T>) {
  const [selectedTab, setSelectedTab] = useState<"table" | "chart">("table");

  return (
    <div>
      <div className="flex items-center gap-2 justify-end">
        <button
          type="button"
          className={`text-center w-12 bg-white text-wiz-white px-2 py-1 text-sm rounded ${
            selectedTab === "table" ? "bg-wiz-red text-wiz-white" : "bg-white bg-opacity-10"
          }`}
          onClick={() => setSelectedTab("table")}
        >
          표
        </button>
        <button
          type="button"
          className={cn(
            "text-center w-12 bg-white text-wiz-white px-2 py-1 text-sm rounded",
            selectedTab === "chart" ? "bg-wiz-red text-wiz-white" : "bg-white bg-opacity-10"
          )}
          onClick={() => setSelectedTab("chart")}
        >
          차트
        </button>
      </div>
      {selectedTab === "table" ? (
        <DataTable data={tableData} columns={columns} isLoading={isLoading} domain={domain} />
      ) : (
        <CustomBarChart data={chartData} config={chartConfig} XAxisKey="teamName" domain="all" showConfig />
      )}
    </div>
  );
}

export { TeamRankingView };
