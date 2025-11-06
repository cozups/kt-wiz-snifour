import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CalenderBody } from "./CalenderBody";

const GAME_TABS_CONFIG = [
  { value: "ktWiz", label: "KT Wiz 경기" },
  { value: "allLeague", label: "전체 리그" },
];

const MatchCalendar = () => {
  const [currentTab, setCurrentTab] = useState<"ktWiz" | "allLeague">("ktWiz");

  const handleTabChange = (value: string) => {
    setCurrentTab(value as "ktWiz" | "allLeague");
  };

  return (
    <div className="w-full my-10">
      <Tabs className="media-container" defaultValue={currentTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center pb-3 mb-5 mt-10">
          {/* 탭 */}
          <TabsList className="media-tabs-list">
            {GAME_TABS_CONFIG.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => handleTabChange(tab.value as "ktWiz" | "allLeague")}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2 text-xs md:text-sm lg:text-base text-white">
            <span className="px-2 lg:px-3 py-2 rounded bg-red-500">승</span>
            <span className="px-2 lg:px-3 py-2  rounded bg-gray-700">패</span>
            <span className="px-2 lg:px-3 py-2  rounded bg-gray-500">무</span>
          </div>
        </div>
        {/* 탭 컨텐츠 */}
        <TabsContent value="ktWiz">
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <CalenderBody />
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="allLeague">
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <CalenderBody type="all" />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { MatchCalendar };
