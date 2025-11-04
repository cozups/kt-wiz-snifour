import { ChartLabelList, CustomBarChart, CustomLineChart } from "@/features/common";
import { SubTitle } from "@/features/common";
import { RecentRecord, YearRecord } from "@/features/player/types/detail";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { RecordTableAccordion } from "./RecordTableAccordion";
import { useChartConfig } from "@/features/common/hooks/useChartConfig";
import { ChartTypeSelector } from "@/features/common/components/ChartTypeSelector";

export interface Config {
  [key: string]: {
    label: string;
    color: string;
    isActive: boolean;
  };
}
interface PlayerRecordChartProps {
  title: string;
  data: RecentRecord[] | YearRecord[];
  config: Config;
  loading: boolean;
  className?: string;
}

function PlayerRecordChartRender({
  isLoading,
  data,
  config,
  chartType,
}: {
  isLoading: boolean;
  data: RecentRecord[] | YearRecord[];
  config: Config;
  chartType: "bar" | "line";
}) {
  // 차트 비교 기준 라벨 선택
  const { chartConfig, toggleConfig } = useChartConfig(config);

  if (isLoading) {
    return <Skeleton className="w-full h-72" />;
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center">
        <p>데이터가 존재하지 않습니다.</p>
        <p className="text-neutral-400">시즌 시작 전인 경우, 시즌 시작 시 데이터가 업데이트 됩니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {chartType === "bar" && <CustomBarChart data={data} config={chartConfig} XAxisKey="gyear" />}
      {chartType === "line" && <CustomLineChart data={data} config={chartConfig} XAxisKey="gyear" />}
      <div className="flex flex-col items-center justify-center gap-2">
        <ChartLabelList config={chartConfig} onClick={toggleConfig} />
        <div className="text-xs text-neutral-400 break-keep text-center">
          해당 라벨을 클릭하여 데이터 표시 정보를 변경할 수 있습니다.
        </div>
      </div>
    </div>
  );
}

function PlayerRecordChart({ title, data, config, loading, className }: PlayerRecordChartProps) {
  // 차트 타입
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  return (
    <div className={cn("w-full bg-wiz-white bg-opacity-10 rounded-xl px-4 pb-8", className)}>
      <div className={cn("flex flex-col ", "md:flex-row md:items-center md:justify-between")}>
        <SubTitle title={title} className="text-lg" />
        <ChartTypeSelector value={chartType} onChange={setChartType} />
      </div>
      <PlayerRecordChartRender isLoading={loading} data={data} config={config} chartType={chartType} />
      <RecordTableAccordion data={data} />
    </div>
  );
}

export { PlayerRecordChart };
