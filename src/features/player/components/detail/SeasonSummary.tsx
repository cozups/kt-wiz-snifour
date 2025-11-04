import { cn } from "@/lib/utils";
import { useParams } from "react-router";

import { useMaxStats } from "@/features/player/hooks/useMaxStats";
import { usePlayer } from "@/features/player/hooks/usePlayer";
import { BatterSeasonSummaryBase, PitcherSeasonSummaryBase } from "@/features/player/types/detail";
import { StatCard } from "./StatCard";
import Skeleton from "react-loading-skeleton";
import { SEASON_SUMMARY_INDICATORS } from "../../constants";

function calculateIPG(inn: number, gamenum: number) {
  return gamenum > 0 ? Number((inn / gamenum).toFixed(3)) : 0;
}

function SeasonSummary() {
  const { position } = useParams();
  const role = position === "pitcher" ? "pitcher" : "batter";
  const { data: player, isLoading } = usePlayer();
  const { maxStats, isLoading: maxStatsLoading } = useMaxStats();

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }
  const data = player?.seasonsummary;

  if (!data) {
    return <div className="font-bold text-center my-4">정규 리그 데이터가 없습니다.</div>;
  }

  if (maxStatsLoading) {
    return <div className="text-center">스탯 계산중입니다...</div>;
  }

  if (!maxStats) {
    return <div className="text-center">팀 성적 계산 중입니다...</div>;
  }

  const INDICATORS_FOR_ROLE = SEASON_SUMMARY_INDICATORS[role];
  const isPitcher = role === "pitcher";
  const ipg = isPitcher ? calculateIPG(data.gamenum, (data as PitcherSeasonSummaryBase).inn2) : 0;

  return (
    <div className={cn("grid grid-cols-4 gap-2 my-4", "md:grid-cols-6 md:gap-3", "lg:grid-cols-10 lg:gap-4")}>
      {INDICATORS_FOR_ROLE.map(({ accessorKey, header }) => {
        const statValue = isPitcher
          ? (data as PitcherSeasonSummaryBase)[accessorKey as keyof PitcherSeasonSummaryBase] || 0
          : (data as BatterSeasonSummaryBase)[accessorKey as keyof BatterSeasonSummaryBase] || 0;

        const progressValue =
          maxStats[accessorKey] > 0 ? Math.round((Number(statValue) / maxStats[accessorKey]) * 100) : 0;

        return <StatCard key={accessorKey} header={header} value={statValue} progress={progressValue} />;
      })}

      {/* 지표가 없어 추가 계산이 필요한 부분 */}
      {isPitcher && (
        <>
          <StatCard
            header="이닝"
            value={(data as PitcherSeasonSummaryBase).innDisplay}
            progress={
              maxStats.inn2 > 0
                ? Math.round((Number((data as PitcherSeasonSummaryBase).inn2) / maxStats.inn2) * 100)
                : 0
            }
          />
          <StatCard
            header="IP/G"
            value={ipg}
            progress={maxStats.ipg > 0 ? Math.round((ipg / maxStats.ipg) * 100) : 0}
          />
        </>
      )}
    </div>
  );
}

export { SeasonSummary };
