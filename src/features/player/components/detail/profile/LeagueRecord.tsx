import { useParams } from "react-router";

import { usePlayer } from "@/features/player/hooks/usePlayer";
import { BatterSeasonSummaryBase, PitcherSeasonSummaryBase, SeasonSummary } from "@/features/player/types/detail";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

interface Season {
  pitcher: { label: string; key: keyof PitcherSeasonSummaryBase }[];
  batter: { label: string; key: keyof BatterSeasonSummaryBase }[];
}

function LeagueRecordSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-6" />
    </div>
  );
}

function LeagueRecord() {
  const { position } = useParams();
  const role = position === "pitcher" ? "pitcher" : "batter";
  const { data: player, isLoading } = usePlayer();

  const season: Season = {
    pitcher: [
      { label: "평균자책점", key: "era" },
      { label: "승", key: "w" },
      { label: "패", key: "l" },
      { label: "세이브", key: "sv" },
    ],
    batter: [
      { label: "타율", key: "hra" },
      { label: "안타", key: "hit" },
      { label: "타점", key: "rbi" },
      { label: "홈런", key: "hr" },
    ],
  };

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const data: Partial<SeasonSummary> | undefined = player?.seasonsummary;

  return (
    <div>
      <h4 className={cn("text-base font-bold mt-2 relative z-0", "md:text-xl", "lg:text-2xl")}>
        2024 정규 리그 성적
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-wiz-red bg-opacity-50 -z-10" />
      </h4>
      <div className={cn("flex flex-col gap-1 py-4", "lg:gap-2")}>
        {isLoading && <LeagueRecordSkeleton />}
        {!isLoading && !data && <h4 className="text-base text-center font-bold mt-2">정규 리그 데이터가 없습니다.</h4>}
        {!isLoading &&
          data &&
          season[role as keyof Season].map((item) => (
            <div key={item.label} className={cn("flex justify-between text-xs", "md:text-sm", "lg:text-base")}>
              <span>{item.label}</span>
              <span className="max-w-48 text-right word-wrap">{data?.[item.key as keyof SeasonSummary]}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export { LeagueRecord };
