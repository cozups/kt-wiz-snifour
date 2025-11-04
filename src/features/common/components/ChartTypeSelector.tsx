import { cn } from "@/lib/utils";

export function ChartTypeSelector({
  value,
  onChange,
}: {
  value: "bar" | "line";
  onChange: (type: "bar" | "line") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={cn(
          "bg-white text-black px-1 py-0.5 my-2 text-xs rounded",
          "md:px-2 md:py-1 md:text-sm",
          value === "bar" && "text-white bg-wiz-red"
        )}
        onClick={() => onChange("bar")}
      >
        막대 차트
      </button>
      <button
        type="button"
        className={cn(
          "bg-white text-black px-1 py-0.5 my-2 text-xs rounded",
          "md:px-2 md:py-1 md:text-sm",
          value === "line" && "text-white bg-wiz-red"
        )}
        onClick={() => onChange("line")}
      >
        선 차트
      </button>
    </div>
  );
}
