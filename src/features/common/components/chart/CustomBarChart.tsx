import { ChartContainer } from "@/components/ui";
import { TeamBatterRank, TeamPitcherRank } from "@/features/common";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { useResponsiveChart } from "../../hooks/useResponsiveChart";

interface Config {
  [key: string]: {
    label: string;
    color: string;
    isActive: boolean;
  };
}

interface CustomBarChartProps<T> {
  data: T[];
  config: Config;
  XAxisKey: string;
  domain?: "kt" | "all";
}

function isTeamData(data: any): data is TeamBatterRank | TeamPitcherRank {
  return "gd" in data;
}

function CustomBarChart<T>({ data, config, XAxisKey, domain }: CustomBarChartProps<T>) {
  const {
    config: { fontSize, maxBarSize },
  } = useResponsiveChart();

  const activeKey: keyof Config = useMemo(() => Object.keys(config).filter((key) => config[key].isActive)[0], [config]);

  return (
    <div>
      <ChartContainer config={config} className="w-full h-52 mt-4">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} strokeOpacity={0.1} />
          <XAxis dataKey={XAxisKey} tickLine={false} axisLine={false} tick={{ fontSize }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize }}
            domain={[
              0,
              () => {
                const max = Math.max(...data.map((item: T) => Number(item[activeKey as keyof T]))); // dataMax를 사용했더니 제대로 max 값을 찾지 못하는 버그가 있어 직접 계산
                return max === 0 ? 5 : (max * 1.1).toFixed(2); // 최대값에 여유를 두고 10% 확대
              },
            ]}
          />
          <Bar
            key={activeKey}
            dataKey={activeKey}
            fill={`var(--color-${activeKey})`}
            radius={3}
            maxBarSize={maxBarSize}
            label={{ position: "top", fontSize }}
          >
            {domain === "all" &&
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={isTeamData(entry) && entry.teamName === "KT" ? `var(--color-${activeKey})` : "#555657"}
                />
              ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export { CustomBarChart };
