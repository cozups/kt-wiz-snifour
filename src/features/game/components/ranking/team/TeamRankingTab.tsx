import { ErrorBoundary } from "react-error-boundary";
import { Tabs, TabsContent, TabsList } from "@/components/ui";
import { Breadcrumb, SubTabsTrigger, SubTitle } from "@/features/common";
import { TeamBatterRankingView, TeamPitcherRankingView, TeamRankingTable, TeamVSTable } from "@/features/game";
import { ErrorFallback } from "../../../../common/components/ErrorFallback";

const TABS = [
  { value: "team", component: <TeamRankingTable /> },
  { value: "teamPitcher", component: <TeamPitcherRankingView /> },
  { value: "teamBatter", component: <TeamBatterRankingView /> },
  { value: "teamMatchRecords", component: <TeamVSTable /> },
];

function TeamRankingTab() {
  return (
    <div className="text-white">
      <Breadcrumb />

      {/* 팀 순위 테이블 */}
      <SubTitle title="2024 시즌 팀 순위" />
      <Tabs defaultValue="team" className="w-full flex flex-col mt-4">
        <TabsList className="w-fit flex items-center gap-4 my-2">
          <SubTabsTrigger value="team">팀 기록</SubTabsTrigger>
          <SubTabsTrigger value="teamPitcher">투수 기록</SubTabsTrigger>
          <SubTabsTrigger value="teamBatter">타자 기록</SubTabsTrigger>
          <SubTabsTrigger value="teamMatchRecords">팀 상대 전적</SubTabsTrigger>
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            <ErrorBoundary fallbackRender={ErrorFallback}>{tab.component}</ErrorBoundary>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export { TeamRankingTab };
