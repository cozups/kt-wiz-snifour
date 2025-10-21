import channelsData from "@/assets/data/broadcastChannels.json";
import { Breadcrumb } from "@/features/common";
import { MatchCalendar, MatchInfoCarousel } from "@/features/game";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../common/components/ErrorFallback";

const MatchScheduleTab = () => {
  return (
    <div className="w-full flex justify-center my-20">
      <div className="w-full flex flex-col items-center justify-center">
        {/* 경로 */}
        <Breadcrumb />

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
      </div>
    </div>
  );
};

export { MatchScheduleTab };
