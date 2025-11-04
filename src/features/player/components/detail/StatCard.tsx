import { Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

interface StatCardProps {
  header: string;
  value: string | number;
  progress: number;
}

function StatCard({ header, value, progress }: StatCardProps) {
  const isString = isNaN(Number(value));

  return (
    <div className="w-28 h-28 flex flex-col items-center justify-center gap-2 md:gap-3 lg:gap-4 rounded-xl border border-wiz-red border-opacity-20 aspect-square">
      <p className="font-bold text-xs md:text-sm ">{header}</p>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {isString ? null : <Progress value={progress} className="text-white w-[75%] h-1" />}
        <p className={cn("text-base md:text-lg lg:text-xl", isString && "text-lg")}>{value}</p>
      </div>
    </div>
  );
}

export { StatCard };
