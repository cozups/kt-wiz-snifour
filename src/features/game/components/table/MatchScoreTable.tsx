import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { ScoreboardEntry } from "@/features/game";

interface MatchScoreTableProps {
  data: ScoreboardEntry[] | undefined;
}

const MatchScoreTable = ({ data }: MatchScoreTableProps) => {
  const thead = ["팀", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "R", "H", "E", "B"];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none">
          {thead.map((item) => (
            <TableHead key={item} className="bg-wiz-red text-white text-center">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((team) => (
          <TableRow key={team.bhomeName} className="border-none font-medium bg-black text-center text-wiz-white">
            <TableCell className="lg:p-2 font-medium text-center bg-[#fefefe50] text-wiz-white">
              {team.bhomeName}
            </TableCell>
            {Array.from({ length: thead.length - 5 }, (_, i) => (
              <TableCell key={`score-${team.bhomeName}-${i + 1}`}>{team[`score${i + 1}`]}</TableCell>
            ))}
            <TableCell>{team.run}</TableCell>
            <TableCell>{team.hit}</TableCell>
            <TableCell>{team.error}</TableCell>
            <TableCell>{team.ballfour}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { MatchScoreTable };
