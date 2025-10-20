import { Tabs, TabsContent, TabsList } from "@/components/ui";
import { seasons } from "@/constants/seasons";
import { Breadcrumb, CustomSelect, SubTabsTrigger } from "@/features/common";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { PlayerRankingView, RankingCard } from "@/features/game";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router";

const TABS = [
  { value: "ktBatters", component: <PlayerRankingView position="batter" domain="kt" /> },
  { value: "allBatters", component: <PlayerRankingView position="batter" domain="all" /> },
];

function BatterRankingTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [season, setSeason] = useState<string>(searchParams.get("gyear") || seasons[0]);

  return (
    <div>
      <Breadcrumb
        leftComponent={
          <CustomSelect
            type="year"
            data={seasons}
            value={season}
            onChange={(value) => {
              setSeason(value);
              setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                gyear: value,
              });
            }}
          />
        }
      />

      {/* 타자 랭킹 카드 */}
      <div
        className={cn(
          "w-full mt-12 bg-wiz-white bg-opacity-10 grid grid-cols-1 rounded-xl p-8 gap-4",
          "lg:grid-cols-2"
        )}
      >
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <RankingCard title="타율 TOP 3" position="batter" indicator="hra" />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <RankingCard title="홈런 TOP 3" position="batter" indicator="hr" />
        </ErrorBoundary>
      </div>

      {/* 타자 순위 표 */}
      <Tabs
        defaultValue="ktBatters"
        onValueChange={() => {
          setSearchParams({ gyear: searchParams.get("gyear") || "" });
        }}
      >
        <TabsList className="my-8">
          <SubTabsTrigger value="ktBatters">KT Wiz 타자</SubTabsTrigger>
          <SubTabsTrigger value="allBatters">전체 타자 순위</SubTabsTrigger>
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <ErrorBoundary fallbackRender={ErrorFallback}>{tab.component}</ErrorBoundary>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export { BatterRankingTab };
