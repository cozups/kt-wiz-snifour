import { ChartContainer } from "@/components/ui";
import { useResponsiveChart } from "@/features/common/hooks/useResponsiveChart";
import { CrowdRank } from "@/features/game/types/ranking";
import Skeleton from "react-loading-skeleton";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

interface CrowdRankingChartProps {
  data: CrowdRank[];
  loading?: boolean;
}

const chartConfig = {
  crowd: {
    label: "관중",
    color: "#aaaaaa",
  },
};

function CrowdRankingChart({ data, loading = false }: CrowdRankingChartProps) {
  const {
    config: { fontSize },
  } = useResponsiveChart();

  if (loading) {
    return (
      <div>
        <Skeleton className="w-full aspect-[3/1]" baseColor="#d1d5db" />
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-96 mb-8">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} strokeOpacity={0.1} />
        <XAxis dataKey="teamName" tickLine={false} axisLine={false} tick={{ fontSize }} />
        <YAxis dataKey="crowd" tickLine={false} axisLine={false} domain={[0, "dataMax+50000"]} tick={{ fontSize }} />
        <Bar dataKey="crowd" fill="var(--color-crowd)" radius={4} maxBarSize={40} label={{ position: "top", fontSize }}>
          {data.map((team) => (
            <Cell key={team.teamCode} fill={team.teamCode === "KT" ? "#D60C0C" : "var(--color-crowd)"} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export { CrowdRankingChart };
