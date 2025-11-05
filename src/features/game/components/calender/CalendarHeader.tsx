import { CustomSelect } from "@/features/common/components/CustomSelect";
import { useMatchStore } from "@/store/useMatchStore";
import { addMonths, format, startOfYear } from "date-fns";
import { IconLeft, IconRight } from "react-day-picker";

interface CalendarHeaderProps {
  displayMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const CalendarHeader = ({ displayMonth, setCurrentMonth }: CalendarHeaderProps) => {
  const { currentMonth } = useMatchStore();

  // currentMonth가 1월이면 작년의 12개월 || 올해의 12개월 생성
  const months = Array.from({ length: 12 }, (_, i) => {
    const baseYear =
      currentMonth.getMonth() === 0
        ? currentMonth.getFullYear() - 1 // 1월까지는 작년 12개월
        : currentMonth.getFullYear(); // 2월부터는 올해 12개월
    return format(addMonths(startOfYear(new Date(baseYear, 0)), i), "yyyy-MM");
  });

  return (
    <div className="flex justify-center items-center gap-10 px-4 py-4 bg-wiz-white bg-opacity-10">
      {/* 이전 버튼 */}
      <button
        onClick={() => {
          setCurrentMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1));
        }}
        type="button"
        className="flex items-center justify-center text-lg font-semibold text-white bg-wiz-white bg-opacity-30 w-8 h-8 md:w-10 md:h-10 rounded hover:bg-wiz-white hover:bg-opacity-20"
      >
        <IconLeft className="w-2/5 h-auto" />
      </button>

      {/* 월 표시 및 드롭다운 */}
      <div className="relative flex items-center">
        <CustomSelect
          type="year-month"
          data={months}
          value={format(displayMonth, "yyyy-MM")}
          onChange={(value) => {
            const [year, month] = value.split("-");
            setCurrentMonth(new Date(Number(year), Number(month) - 1));
          }}
        />
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={() => {
          setCurrentMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1));
        }}
        className="flex items-center justify-center text-lg font-semibold text-white bg-wiz-white bg-opacity-30 w-8 h-8 md:w-10 md:h-10 rounded hover:bg-wiz-white hover:bg-opacity-20"
      >
        <IconRight className="w-2/5 h-auto" />
      </button>
    </div>
  );
};

export { CalendarHeader };
