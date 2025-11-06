import { OverallBatterRank, OverallPitcherRank } from "@/features/common";
import { CrowdRank } from "@/features/game/types/ranking";
import { useMemo } from "react";
import { TooltipProps } from "recharts";
import { CustomIndicator } from "./CustomIndicator";

type Payload = OverallPitcherRank & OverallBatterRank & CrowdRank;

interface CustomTooltipProps extends TooltipProps<string, string> {
  type: string;
}

function CustomTooltip({ active, payload, type }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { playerName, era, wra, gamenum, teamName, hra, ops, crowd } = payload[0].payload as Payload;

    const label = useMemo(() => {
      if (type === "pitcher" || type === "batter") {
        return `${playerName}(${teamName})`;
      }
      return teamName;
    }, [type, playerName, teamName]);

    return (
      <div className="w-fit bg-white text-black p-2 border rounded shadow-md">
        <div className="flex items-center justify-between mb-2 gap-8">
          <p className="font-bold ">{label}</p>
          {gamenum && <p className="text-sm">{gamenum}번 출장</p>}
        </div>
        {type === "pitcher" && (
          <>
            <CustomIndicator indicator="ERA" value={era} />
            <CustomIndicator indicator="승률" value={wra} />
          </>
        )}
        {type === "batter" && (
          <>
            <CustomIndicator indicator="타율" value={hra} />
            <CustomIndicator indicator="OPS" value={ops} />
          </>
        )}
        {type === "crowd" && <CustomIndicator indicator="관중" value={crowd.toLocaleString()} />}
      </div>
    );
  }
  return null;
}

export { CustomTooltip };
