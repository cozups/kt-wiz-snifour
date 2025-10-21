import React from "react";
import { Link, useLocation, useParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import CheerSongPage from "./CheerSongPage";
import CheerleaderPage from "./CheerLeaderPage";
import CoachPage from "./CoachPage";
import { Banner, Breadcrumb } from "@/features/common";
import { ErrorFallback } from "@/features/common/components/ErrorFallback";
import { PlayerList } from "@/features/player";
import { cn } from "@/lib/utils";

const PAGE_CONFIG = {
  coach: {
    title: "KT Wiz 코칭스텝",
    subtitle: "코칭스텝",
    description: "최고의 kt wiz 코칭스탭을 소개합니다.",
  },
  pitcher: {
    title: "KT Wiz 선수단",
    subtitle: "투수",
    description: "KT Wiz의 자랑스런 '첫 번째 선수단'을 소개합니다.",
  },
  batter: {
    title: "KT Wiz 선수단",
    subtitle: "타자",
    description: "KT Wiz의 자랑스런 '첫 번째 선수단'을 소개합니다.",
  },
  cheer: {
    title: "KT Wiz 응원단",
    subtitle: "응원단",
    description: "kt wiz꽃! kt wiz의 응원단",
  },
};

function SubTab({ link, children }: { link: string; children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={link}
      className={cn("block w-24 h-8 text-white text-center leading-8 rounded", pathname === link && "bg-wiz-red")}
    >
      {children}
    </Link>
  );
}

function PlayerListPage() {
  const { position } = useParams();

  const isBatter = position && ["catcher", "infielder", "outfielder"].includes(position);

  const currentPageConfig = isBatter ? PAGE_CONFIG.batter : PAGE_CONFIG[position as keyof typeof PAGE_CONFIG];

  switch (position) {
    case "coach":
      return <CoachPage />;
    case "cheer":
      return <CheerleaderPage />;
    case "song":
      return <CheerSongPage />;
    default:
      return (
        <div>
          <Banner>
            <Banner.Image
              src={`https://placehold.co/1200x200/141414/642521?text=WIZ+${position?.toUpperCase()}`}
              alt={`KT WIZ ${currentPageConfig.subtitle}`}
            />
            <Banner.Overlay>
              <Banner.Heading title={currentPageConfig.title} subtitle={currentPageConfig.subtitle} />
              <Banner.Description description={currentPageConfig.description} />
            </Banner.Overlay>
          </Banner>
          <Breadcrumb />
          <ErrorBoundary fallbackRender={ErrorFallback}>
            {isBatter && (
              <div className="flex items-center gap-2 my-4">
                <SubTab link="/player/catcher">포수</SubTab>
                <SubTab link="/player/infielder">내야수</SubTab>
                <SubTab link="/player/outfielder">외야수</SubTab>
              </div>
            )}
            <PlayerList />
          </ErrorBoundary>
        </div>
      );
  }
}

export default PlayerListPage;
