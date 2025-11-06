import { Tabs, TabsContent, TabsList } from "@/components/ui";
import { SubTabsTrigger } from "@/features/common";
import {
  BatterRankingTab,
  CrowdRankingTab,
  PitcherRankingTab,
  TeamRankingTab,
} from "@/features/game/components/ranking/tabs";
import { useTabFromUrl } from "@/hooks/useTabFromUrl";

const REG_TABS_CONFIG = [
  { value: "team", path: "/ranking/team" },
  { value: "pitcher", path: "/ranking/pitcher" },
  { value: "batter", path: "/ranking/batter" },
  { value: "crowd", path: "/ranking/crowd" },
];

function RankingTab() {
  const { currentTab, handleTabChange } = useTabFromUrl({
    basePath: "/game/regular",
    tabs: REG_TABS_CONFIG,
    defaultTab: "team",
  });

  return (
    <div>
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <SubTabsTrigger value="team">팀 순위</SubTabsTrigger>
          <SubTabsTrigger value="pitcher">투수 순위</SubTabsTrigger>
          <SubTabsTrigger value="batter">타자 순위</SubTabsTrigger>
          <SubTabsTrigger value="crowd">관중 현황</SubTabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <TeamRankingTab />
        </TabsContent>
        <TabsContent value="pitcher">
          <PitcherRankingTab />
        </TabsContent>
        <TabsContent value="batter">
          <BatterRankingTab />
        </TabsContent>
        <TabsContent value="crowd">
          <CrowdRankingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { RankingTab };
