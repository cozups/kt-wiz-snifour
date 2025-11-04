import { ChartContainer } from "@/components/ui";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useResponsiveChart } from "../hooks/useResponsiveChart";

interface CustomLineChartProps<T> {
  data: T[];
  config: {
    [key: string]: {
      label: string;
      color: string;
      isActive: boolean;
    };
  };
  XAxisKey: string;
}

function CustomLineChart<T>({ data, config, XAxisKey }: CustomLineChartProps<T>) {
  const {
    config: { fontSize },
  } = useResponsiveChart();

  const activeKey = useMemo(() => Object.keys(config).filter((key) => config[key].isActive)[0], [config]);

  return (
    <ChartContainer config={config} className="w-full h-52 mt-4">
      <LineChart accessibilityLayer data={data}>
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

        <Line
          key={activeKey}
          dataKey={activeKey}
          stroke={`var(--color-${activeKey})`}
          strokeWidth={3}
          dot={{ fill: `var(--color-${activeKey})` }}
          label={{ position: "top", fontSize }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export { CustomLineChart };
