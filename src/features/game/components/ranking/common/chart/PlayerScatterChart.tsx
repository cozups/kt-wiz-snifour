import { SubTitle } from "@/features/common";
import { OverallBatterRank, OverallPitcherRank } from "@/features/common";
import { assignColor } from "@/features/game/services/assing-color.service";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { Props } from "recharts/types/container/Surface";
import { CellLegend } from "./CellLegend";
import { CustomTooltip } from "./CustomTooltip";
import { useResponsiveChart } from "@/features/common/hooks/useResponsiveChart";

type PlayerRank = OverallPitcherRank | OverallBatterRank;

interface PlayerScatterChartProps {
  data: PlayerRank[];
  loading?: boolean;
  position: "pitcher" | "batter";
}

interface CellProps {
  cx: number;
  cy: number;
  payload: PlayerRank & { color: string };
}

const AXIS_CONFIG = {
  pitcher: { x: "wra", xLabel: "승률", y: "era", yLabel: "평균자책점" },
  batter: { x: "hra", xLabel: "타율", y: "ops", yLabel: "OPS" },
};

function PlayerScatterChart({ data, position, loading = false }: PlayerScatterChartProps) {
  const {
    config: { fontSize, aspect, cellSize },
  } = useResponsiveChart();

  const { x, y, xLabel, yLabel } = useMemo(() => {
    return position === "pitcher" ? AXIS_CONFIG.pitcher : AXIS_CONFIG.batter;
  }, [position]);

  const chartData = useMemo(() => {
    if (position === "pitcher") {
      const pitchers = (data as OverallPitcherRank[])
        .filter((player) => player.gamenum >= 10)
        .sort((a, b) => Number(b.wra) / Number(b.era) - Number(a.wra) / Number(a.era));

      return pitchers.map((pitcher, index) => ({
        ...pitcher,
        era: Number(pitcher.era),
        wra: Number(pitcher.wra),
        color: assignColor(index, pitchers.length),
      }));
    } else {
      const batters = (data as OverallBatterRank[])
        .filter((player) => player.gamenum >= 10)
        .sort((a, b) => Number(b.ops) + Number(b.hra) - (Number(a.ops) + Number(a.hra)));

      return batters.map((batter, index) => ({
        ...batter,
        ops: Number(batter.ops),
        hra: Number(batter.hra),
        color: assignColor(index, batters.length),
      }));
    }
  }, [data, position]);

  const CustomImageCell = (props: unknown) => {
    const { cx, cy, payload } = props as Props & CellProps; // cx와 cy는 점의 좌표, payload는 데이터
    return (
      <foreignObject
        x={cx - cellSize.width / 2} // 이미지 위치 (중앙 정렬)
        y={cy - cellSize.height / 2} // 이미지 위치 (중앙 정렬)
        width={cellSize.width} // 이미지 너비
        height={cellSize.height} // 이미지 높이
      >
        <div className={cn("w-full h-full rounded-full p-0.5 md:p-1", payload.color)}>
          <img
            src={payload.playerPrvwImg}
            alt={payload.playerName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </foreignObject>
    );
  };

  return (
    <div>
      <SubTitle title={`${xLabel}과 ${yLabel} 비교`} />
      <div className="text-neutral-500 mb-1 md:mb-2 lg:mb-4">
        <p className={cn("text-xs md:text-sm lg:text-base")}>10경기 이상 출장한 선수만 표시합니다.</p>
        <div className="flex items-center gap-4 text-xs md:text-sm lg:text-base">
          <CellLegend color="#059212" label="상위권" />
          <CellLegend color="#ffba08" label="중위권" />
          <CellLegend color="#6b7280" label="하위권" />
        </div>
      </div>
      {loading && (
        <div>
          <Skeleton baseColor="#d1d5db" className="w-full aspect-[3/1]" />
        </div>
      )}
      {!loading && !data.length && <div>데이터가 존재하지 않습니다.</div>}
      {!loading && data.length > 0 && (
        <ResponsiveContainer aspect={aspect}>
          <ScatterChart data={data}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey={x}
              label={{
                value: xLabel,
                position: "insideBottom",
                fontSize,
              }}
              height={50}
              domain={["dataMin", "auto"]}
              tick={{ fontSize }}
            />
            <YAxis
              type="number"
              dataKey={y}
              label={{
                value: yLabel,
                angle: 90,
                position: "insideLeft",
                fontSize,
              }}
              domain={["dataMin", "auto"]}
              tick={{ fontSize }}
            />
            <Tooltip content={<CustomTooltip type={position} />} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name={`${xLabel}과 ${yLabel} 비교`} data={chartData} shape={CustomImageCell}>
              {data.map((entry) => (
                <Cell key={entry.pcode} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export { PlayerScatterChart };
