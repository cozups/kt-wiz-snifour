import { useState } from "react";
import { useSearchParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import { Tabs, TabsContent, TabsList } from "@/components/ui";
import { seasons } from "@/constants/seasons";
import { Breadcrumb, CustomSelect, SubTabsTrigger } from "@/features/common";
import { PitcherRankingView, RankingCard } from "@/features/game";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "ktPitchers", component: <PitcherRankingView domain="kt" /> },
  { value: "allPitchers", component: <PitcherRankingView domain="all" /> },
];

function PitcherRankingTab() {
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

      {/* 투수 랭킹 카드 */}
      <div
        className={cn(
          "w-full mt-12 bg-wiz-white bg-opacity-10 grid grid-cols-1 rounded-xl p-8 gap-4",
          "lg:grid-cols-2"
        )}
      >
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <RankingCard title="평균 자책점 TOP 3" position="pitcher" indicator="era" />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <RankingCard title="승리 TOP 3" position="pitcher" indicator="w" />
        </ErrorBoundary>
      </div>

      {/* 투수 순위 표 */}
      <Tabs
        defaultValue="ktPitchers"
        onValueChange={() => {
          setSearchParams({ gyear: searchParams.get("gyear") || "" });
        }}
      >
        <TabsList className="my-8">
          <SubTabsTrigger value="ktPitchers">KT Wiz 투수</SubTabsTrigger>
          <SubTabsTrigger value="allPitchers">전체 투수 순위</SubTabsTrigger>
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

export { PitcherRankingTab };
