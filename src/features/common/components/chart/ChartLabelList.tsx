import { Config } from "@/features/player";
import { cn } from "@/lib/utils";

interface ChartLabelListProps {
  config: Config;
  onClick: (key: keyof Config) => void;
}
function ChartLabelList({ config, onClick }: ChartLabelListProps) {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-center md:ml-8 gap-2">
      {Object.keys(config).map((key) => (
        <button
          type="button"
          key={key}
          className={cn(
            "px-2 py-1 text-xs rounded",
            "md:text-sm",
            config[key].isActive ? "text-wiz-white" : "bg-wiz-white bg-opacity-30"
          )}
          style={{
            backgroundColor: config[key].isActive ? config[key].color : undefined,
          }}
          onClick={() => onClick(key as keyof Config)}
        >
          {config[key].label}
        </button>
      ))}
    </div>
  );
}

export { ChartLabelList };
