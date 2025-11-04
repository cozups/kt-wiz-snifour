import { BatterSeasonSummaryBase, PitcherSeasonSummaryBase } from "./types/detail";

interface Indicators {
  pitcher: {
    accessorKey: keyof PitcherSeasonSummaryBase;
    header: string;
  }[];
  batter: {
    accessorKey: keyof BatterSeasonSummaryBase;
    header: string;
  }[];
}

export const SEASON_SUMMARY_INDICATORS: Indicators = {
  pitcher: [
    { accessorKey: "era", header: "평균자책점" },
    { accessorKey: "gamenum", header: "경기 수" },
    { accessorKey: "wCg", header: "완투" },
    { accessorKey: "sho", header: "완봉" },
    { accessorKey: "w", header: "승" },
    { accessorKey: "l", header: "패" },
    { accessorKey: "sv", header: "세이브" },
    { accessorKey: "hold", header: "홀드" },
    { accessorKey: "wra", header: "승률" },
    { accessorKey: "bf", header: "타자" },
    { accessorKey: "tugucount", header: "투구 수" },
    { accessorKey: "hit", header: "피안타" },
    { accessorKey: "hr", header: "피홈런" },
    { accessorKey: "sf", header: "희비" },
    { accessorKey: "sh", header: "희타" },
    { accessorKey: "bb", header: "볼넷" },
    { accessorKey: "ib", header: "고의4구" },
    { accessorKey: "hp", header: "사구" },
    { accessorKey: "kk", header: "탈삼진" },
    { accessorKey: "wp", header: "폭투" },
    { accessorKey: "bk", header: "보크" },
    { accessorKey: "r", header: "실점" },
    { accessorKey: "er", header: "자책점" },
    { accessorKey: "bs", header: "블론세이브" },
    { accessorKey: "whip", header: "WHIP" },
    { accessorKey: "oavg", header: "피안타율" },
    { accessorKey: "qs", header: "QS" },
    { accessorKey: "kbb", header: "K/BB" },
  ],
  batter: [
    { accessorKey: "hra", header: "타율" },
    { accessorKey: "gamenum", header: "경기" },
    { accessorKey: "pa", header: "타석" },
    { accessorKey: "ab", header: "타수" },
    { accessorKey: "run", header: "득점" },
    { accessorKey: "hit", header: "안타" },
    { accessorKey: "h2", header: "2루타" },
    { accessorKey: "h3", header: "3루타" },
    { accessorKey: "hr", header: "홈런" },
    { accessorKey: "rbi", header: "타점" },
    { accessorKey: "sb", header: "도루" },
    { accessorKey: "cs", header: "도실" },
    { accessorKey: "sf", header: "희타" },
    { accessorKey: "sh", header: "희비" },
    { accessorKey: "bb", header: "볼넷" },
    { accessorKey: "ib", header: "고의4구" },
    { accessorKey: "hp", header: "사구" },
    { accessorKey: "kk", header: "삼진" },
    { accessorKey: "gd", header: "병살" },
    { accessorKey: "slg", header: "장타율" },
    { accessorKey: "bra", header: "출루율" },
    { accessorKey: "sba", header: "도루성공률" },
    { accessorKey: "bbkk", header: "BB/K" },
    { accessorKey: "xbhrun", header: "장타/안타" },
    { accessorKey: "ops", header: "OPS" },
    { accessorKey: "spHra", header: "득점권타율" },
  ],
};
