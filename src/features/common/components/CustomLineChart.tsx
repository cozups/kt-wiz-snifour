import { ChartContainer } from "@/components/ui";
import { RecentRecord, YearRecord } from "@/features/player/types/detail";
import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface CustomLineChartProps {
  data: RecentRecord[] | YearRecord[];
  config: {
    [key: string]: {
      label: string;
      color: string;
      isActive: boolean;
    };
  };
  XAxisKey: string;
}

function CustomLineChart({ data, config, XAxisKey }: CustomLineChartProps) {
  const activeKey = useMemo(() => Object.keys(config).filter((key) => config[key].isActive)[0], [config]);
  const [fontSize, setFontSize] = useState("16px");

  if (!data) {
    return null;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 모바일 화면 크기 기준
        setFontSize("10px");
      } else {
        setFontSize("16px");
      }
    };

    // 초기 화면 크기 설정
    handleResize();
    // 화면 크기 변경 감지
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              const max = Math.max(
                ...data.map((item: RecentRecord | YearRecord) =>
                  Number(item[activeKey as keyof (RecentRecord | YearRecord)])
                )
              ); // dataMax를 사용했더니 제대로 max 값을 찾지 못하는 버그가 있어 직접 계산
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
