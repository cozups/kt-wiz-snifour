import { ErrorBoundary } from "react-error-boundary";

import channelsData from "@/assets/data/broadcastChannels.json";
import { ErrorFallback } from "../common/components/ErrorFallback";
import { MatchInfoCarousel } from "./components/carousel/MatchInfoCarousel";
import { MatchCalendar } from "./components/calender";

const MatchScheduleTab = () => {
  return (
    <>
      {/* 경기 정보 */}
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <MatchInfoCarousel />
      </ErrorBoundary>

      {/* 달력 */}
      <MatchCalendar />

      {/* 중계 채널 정보 */}
      <div className="w-full flex-col gap-2 hidden md:flex md:text-sm lg:text-base">
        {channelsData.channels.map((channel) => (
          <div className="flex items-start justify-start w-full" key={channel.category}>
            <strong className="flex items-centers justify-center flex-shrink-0 mr-3 px-3 w-14 bg-wiz-white bg-opacity-10 text-white rounded">
              {channel.category}
            </strong>
            <span className="text-sm font-light justify-start">
              {channel.items.map((item, index) => (
                <span key={item.name} className="text-wiz-white text-opacity-70">
                  {item.code}
                  <span className="text-wiz-white text-opacity-30">({item.name})</span>
                  {index < channel.items.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export { MatchScheduleTab };
