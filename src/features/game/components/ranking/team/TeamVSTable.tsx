import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { TEAMVS_ORDER } from "@/constants/team-vs-order";
// import { useTeamVS } from "@/features/game/hooks/ranking/useTeamVS";
import { ArrangedTeamVS, arrangeVS, TeamVSResult } from "@/features/game/services/arrange-vs.service";
import { cn } from "@/lib/utils";
import data from "@/assets/data/__test__/mockRanking.json";
import { TableSkeleton } from "@/features/common/components/TableSkeleton";

function TeamVSTable() {
  // const { vs, isLoading, isError, error } = useTeamVS();

  // if (isError) {
  //   throw new Error(error?.toString());
  // }

  const vs = arrangeVS(data.teamVS);

  const isLoading = false;

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <p className={cn("text-neutral-400 text-xs", "md:text-sm", "lg:text-base")}>팀 간 승-패-무 정보입니다.</p>

      <Table className="mt-4">
        <TableHeader>
          <TableRow className="font-semibold border-none">
            <TableHead className="text-center bg-wiz-white bg-opacity-30">팀명</TableHead>
            {TEAMVS_ORDER.map(({ teamCode, teamName }) => (
              <TableHead
                key={`th-${teamCode}`}
                className={cn(
                  "text-center bg-wiz-white bg-opacity-30 text-xs",
                  "md:text-sm",
                  "lg:text-base",
                  teamCode === "KT" && "bg-wiz-red bg-opacity-70"
                )}
              >
                {teamName}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="text-center">
          {TEAMVS_ORDER.map(({ teamCode, teamName }, index) => (
            <TableRow
              key={`tr-${teamCode}`}
              className={cn(
                "border-b-wiz-white border-opacity-10",
                teamCode === "KT" && "bg-wiz-red bg-opacity-70 font-bold"
              )}
            >
              <TableCell>{teamName}</TableCell>
              {TEAMVS_ORDER.map(({ teamCode: vsTeamCode }, vIndex) => {
                const rowData = vs[teamCode] as ArrangedTeamVS;

                const { win, lose, drawn } = (rowData[vsTeamCode] as TeamVSResult) || { win: 0, lose: 0, drawn: 0 };

                return (
                  <TableCell
                    key={`${teamCode}-${vsTeamCode}`}
                    className={cn(
                      "w-fit",
                      index > 0 && vIndex === 0 && "bg-wiz-red bg-opacity-70 font-bold" // 중복 색칠 방지(배경색 투명도가 있기 때문)
                    )}
                  >
                    {teamCode !== vsTeamCode && (
                      <p>
                        {win}-{lose}-{drawn}
                      </p>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TeamVSTable };
