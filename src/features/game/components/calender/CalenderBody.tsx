import { useMatchStore } from "@/store/useMatchStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { useGetMatchScheduleQuery } from "../../apis/match-schedule/matchScheduleApi.query";
import Skeleton from "react-loading-skeleton";
import { MatchCalendarCell } from "./MatchCalendarCell";
import { CalendarHeader } from "./CalendarHeader";

interface CalenderBodyProps {
  // renderCellContent: (date: Date) => React.ReactNode;
  type?: "kt" | "all";
}

const CalenderBody = ({ type = "kt" }: CalenderBodyProps) => {
  const { currentMonth, setCurrentMonth, selectedDate, setSelectedDate } = useMatchStore();

  const { matchData, isError, error, isLoading } = useGetMatchScheduleQuery({ currentMonth, type });

  if (isLoading) {
    return <Skeleton className="w-full h-[48rem]" />;
  }

  if (isError) {
    throw new Error(error?.toString());
  }

  const renderCellContent = (date: Date) => {
    const formattedDate = format(date, "yyyyMMdd");

    const matches = matchData?.filter((item) => item.gameDate.toString() === formattedDate);

    return <MatchCalendarCell date={date} data={matches || []} type={type} />;
  };

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      locale={ko}
      className="border border-[#fefefe40] rounded-lg w-full max-w-full mx-auto  overflow-hidden"
      classNames={{
        table: "w-full border-collapse overflow-hidden",
        cell: "h-[120px] md:h-[180px] w-[160px] text-center p-0 border border-[#fefefe40] relative",
        day: "h-full w-full text-sm flex items-center justify-center relative",
      }}
      captionLayout="dropdown"
      defaultMonth={new Date()}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      fromMonth={new Date(2024, 6)}
      toMonth={new Date(2025, 9)}
      components={{
        Caption: (props) => <CalendarHeader displayMonth={props.displayMonth} setCurrentMonth={setCurrentMonth} />,
        Head: () => (
          <thead>
            <tr className="bg-wiz-white bg-opacity-10">
              {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                <th
                  key={day}
                  className={`p-2 font-medium text-xs text-md:sm lg:text-base ${
                    index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-wiz-white"
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        ),
        DayContent: ({ date }) => (
          <div
            className={`relative w-full h-full bg-wiz-white bg-opacity-5 ${
              format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "border-2 border-wiz-red" : ""
            }`}
          >
            {renderCellContent(date)}
          </div>
        ),
      }}
    />
  );
};

export { CalenderBody };
