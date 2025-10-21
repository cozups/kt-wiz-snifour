import { GameSchedule } from "@/features/game/types/match-schedule";
import { format } from "date-fns";

interface MatchCalendarCellProps {
  date: Date;
  data: GameSchedule[];
  type?: "kt" | "all";
}

const MatchCalendarCell = ({ date, data, type = "kt" }: MatchCalendarCellProps) => {
  const day = date.getDay();

  if (!data.length) {
    return;
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "승":
        return "bg-red-500";
      case "패":
        return "bg-gray-700";
      case "무":
        return "bg-gray-500";
      case "취":
        return "border border-wiz-white border-rounded border-opacity-30";

      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start gap-2">
      {/* 날짜 */}
      <div
        className={`absolute top-1 md:top-2 right-2 text-[8px] md:text-sm lg:text-base font-bold ${
          day === 0 ? "text-red-500" : day === 6 ? "text-blue-500" : "text-wiz-white"
        }`}
      >
        {format(date, "d")}
      </div>

      {type === "kt" && (
        <div
          key={data[0].gmkey}
          className={`relative w-full h-full p-2 flex flex-col items-center justify-start gap-2 ${
            data[0].stadium === "수원" ? "bg-wiz-red bg-opacity-20" : ""
          }`}
        >
          {/* 경기 결과 */}
          <div
            className={`absolute left-1 md:top-2 md:left-2 text-[10px] md:text-xs text-wiz-white px-1 md:py-1 md:px-2 rounded ${getResultColor(
              data[0].outcome
            )}`}
          >
            {data[0].outcome}
          </div>

          {/* 팀 로고 */}
          <img
            src={data[0].home === "KT" ? data[0].visitLogo : data[0].homeLogo}
            alt="team logo"
            className="w-12 h-auto mt-6 md:w-20 md:my-6"
          />

          {/* 경기 정보 */}
          <span className="text-[10px] md:text-sm text-wiz-white">
            {data[0].gtime} {data[0].stadium}
          </span>
          <div className="text-wiz-white text-opacity-40 text-[8px] md:text-sm hidden md:inline">
            {data[0].broadcast}
          </div>
        </div>
      )}

      {/* 전체 리그 */}
      {type === "all" && (
        <div className="flex flex-col md:gap-1 lg:gap-2 items-center mt-4 md:mt-6">
          {data.map((match) => {
            const isKTGame = match.home === "KT" || match.visit === "KT";
            return (
              <p
                key={match.gmkey}
                className={`${isKTGame ? "text-wiz-red" : "text-wiz-white"} text-[7px] md:text-[10px] lg:text-base`}
              >
                <span className="mr-1">
                  {match.home} {match.homeScore || "-"} : {match.visit} {match.visitScore || "-"}
                </span>
                <span className="hidden md:inline">[{match.stadium}]</span>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { MatchCalendarCell };
