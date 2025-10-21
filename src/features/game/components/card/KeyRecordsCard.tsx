import { Card, CardContent } from "@/components/ui";
import { Batter, BoxscoreData, EtcGame, Pitcher } from "@/features/game";
import { usePlayerImages } from "@/features/game/hooks/boxscore/usePlayerImage";

interface KeyRecordsTableProps {
  data: BoxscoreData;
}

export const getRecordByHow = (how: string, data: EtcGame[] | undefined) => {
  const record = data?.find((game) => game.how === how);
  return record ? record.result : "";
};

function KeyRecordsCard({ data }: KeyRecordsTableProps) {
  const tableRows = data.etcgames.map((record) => ({ label: record.how }));

  /* 기록을 분리하는 함수
    ex) "홍길동(1타점) 이철수(2안타) 박영희(홈런)"
    => ["홍길동(1타점)", "이철수(2안타)", "박영희(홈런)"] */
  const seperateRecords = (str: string): string[] => {
    const pattern = /[^\s]+\([^\)]+\)/g;
    return str.match(pattern) || [str];
  };

  const extractName = (name: string) => {
    const extracted = name
      .replace(/\d+호/g, "") // "숫자+호" 제거
      .replace(/\(.*?\)/g, "") // 괄호 제거
      .replace(/\d+/g, "") // 숫자 제거
      .trim();

    return extracted;
  };

  const findTeam = (name: string) => {
    const homePlayers: (Batter | Pitcher)[] = [...data.hbatters, ...data.hpitchers];

    return homePlayers.find((player) => player.name === name)
      ? data.schedule.current.homeKey
      : data.schedule.current.visitKey;
  };

  const extracted = data.etcgames
    .filter((record) => record.result !== "없음" && record.how !== "심판")
    .flatMap((record) =>
      seperateRecords(record.result).map((elem) => ({
        team: findTeam(extractName(elem)),
        name: extractName(elem),
      }))
    );

  const playerImageQueries = usePlayerImages(extracted).map((query) => query.data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tableRows.map((row) => (
        <Card key={row.label} className="hover:scale-105 transition-transform ease-in-out duration-500 rounded-lg">
          <CardContent className="flex flex-col justify-start p-3 sm:p-4">
            <h1 className="md:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">{row.label}</h1>
            {seperateRecords(getRecordByHow(row.label, data.etcgames)).map((record) => (
              <div className="flex gap-2 items-center" key={`${row.label}-${record}`}>
                {row.label !== "심판" && record.length > 0 && record !== "없음" && (
                  <img
                    src={playerImageQueries.find((query) => query?.playerName === extractName(record))?.image}
                    alt={extractName(record)}
                    className="w-6 h-8 sm:w-7 sm:h-9 rounded-full"
                  />
                )}
                <span className="text-sm sm:text-base break-keep">{record}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { KeyRecordsCard };
