export interface GameRecord {
  displayDate?: string; // 경기 일자
  matchTeamCode?: string; // 상대팀 코드
  matchTeamName?: string; // 상대팀 이름
  bb: number; // 볼넷
  hit: number; // 안타
  hr: number; // 홈런
  hp: number; // 몸에 맞는 볼
  r?: number; // 득점
  sv?: number; // 세이브
  wl?: string; // 승패 (예: "W", "L")
  wls?: string; // 승패 상태 (예: "W", "L", "S")
  oavg?: string; // 상대 타율 (투수 전용 필드)
  inn2?: number; // 투구 이닝 (투수 전용 필드)
  innDisplay?: string; // 투구 이닝 표시 (투수 전용 필드, 예: "1 1/3")
  kk?: number; // 삼진 (투수 전용 필드)
  pa?: number; // 타석 수 (투수 전용 필드)
  er?: number; // 자책점 (투수 전용 필드)
  // 포수 관련 추가 필드
  ab?: number; // 타석 (포수 전용 필드)
  bra?: string; // 타율 (포수 전용 필드)
  rbi?: number; // 타점 (포수 전용 필드)
  run?: number; // 득점 (포수 전용 필드)
  sb?: number; // 도루 (포수 전용 필드)
  gd?: number; // 더블플레이 (포수 전용 필드)
  h2?: number; // 2루타 (포수 전용 필드)
  h3?: number; // 3루타 (포수 전용 필드)
  hra?: string; // 홈런 비율 (포수 전용 필드)
}

export interface PlayerBase {
  backnum: string;
  birth: string;
  bloodGroups: string;
  bornPlace: string;
  career: string;
  career2: string;
  debutYear: string;
  energybar: number;
  energybarName: string;
  engName: string;
  gyear: string;
  hasFanpage: string;
  height: string;
  hittype: string;
  mobilePlayerImg: string;
  mobilePlayerImg1: string;
  mobilePlayerImg2: string;
  money: string;
  pcode: string;
  playerName: string;
  playerPrvwImg: string;
  playerPrvwImg1: string;
  playerPrvwImg2: string;
  playerPrvwImg3: string;
  position: string;
  position2: string;
  promise: string;
  rank: number;
  rankName: string;
  teamCode: string;
  teamName: string;
  weight: string;
}

export interface PitcherSeasonSummaryBase {
  ab?: number; // 타자에만 존재하는 필드 (타자의 경우 사용하지 않음)
  babip: string; // BABIP (Batting Average on Balls In Play)
  bb: number; // 볼넷
  bf: number; // 타자에게 투구한 수
  bk: number; // 폭투
  bs: number; // 블론 세이브
  er: number; // 자책점
  era: string; // 방어율 (ERA)
  err: number; // 오류
  fip: string; // FIP (Fielding Independent Pitching)
  fo: number; // 병살타 유도
  gamenum: number; // 게임 수
  go: number; // 땅볼 유도
  gyear: string; // 연도
  havg?: string; // 타율 (타자에만 존재하는 필드)
  hit: number; // 피안타
  hold: number; // 홀드
  hp: number; // 몸에 맞은 공
  hr: number; // 홈런
  ib: number; // 고의 사구
  inn2: number; // 이닝 2차
  innDisplay: string; // 이닝 디스플레이
  kbb: string; // K/BB 비율
  kk: number; // 삼진
  l: number; // 패배
  oavg: string; // 상대 타율
  pcode: string; // 선수 코드
  qs: number; // 품질 시작 수
  qsPlus: number; // 품질 시작 + 수
  r: number; // 실점
  ravg: string; // 상대 평균 타율
  sf: number; // 희생 플라이
  sh: number; // 희생 번트
  sho: number; // 완봉
  start: number; // 선발 등판 횟수
  sv: number; // 세이브
  svo: number; // 세이브 기회
  tugucount: number; // 투구 수
  turfSave: number; // 구원 세이브
  w: number; // 승리
  wCg: number; // 완투 승리
  war: string; // WAR (Wins Above Replacement)
  whip: string; // WHIP (Walks + Hits per Inning Pitched)
  winShares: string; // Win Shares
  wl: string; // 승/패 기록
  wp: number; // 폭투
  wra: string; // WRA (Weighted Run Average)
}

export interface BatterSeasonSummaryBase {
  ab: number; // 타수
  babip: string; // BABIP (Batting Average on Balls In Play)
  bb: number; // 볼넷
  bbkk: string; // BB/K 비율
  bra: string; // 배팅 성공률
  cs: number; // 도루 실패
  finalHit: number; // 최종 안타
  gamenum: number; // 게임 수
  gd: number; // 안타 이닝
  gyear: string; // 연도
  h2: number; // 2루타 수
  h3: number; // 3루타 수
  hit: number; // 안타 수
  hp: number; // 몸에 맞은 공
  hr: number; // 홈런 수
  hra: string; // 홈런 비율
  ib: number; // 고의사구
  kk: number; // 삼진 수
  ops: string; // OPS (On-base Plus Slugging)
  opsPlus: string; // OPS+
  pa: number; // 타석 수
  rbi: number; // 타점
  run: number; // 득점
  sb: number; // 도루 수
  sbTryCn: number; // 도루 시도 횟수
  sba: string; // 도루 성공률
  sf: number; // 희생 플라이
  sh: number; // 희생 번트
  slg: string; // SLG (Slugging Percentage)
  spHra: string; // 특정 타율
  war: string; // WAR (Wins Above Replacement)
  winShares: string; // Win Shares
  woba: string; // wOBA (Weighted On-Base Average)
  wrHit: string; // Hit Weighted Runs
  xbhrun: string; // Extra base hit 비율
}

export interface Player {
  gameplayer: PlayerBase;
  recentgamerecordlist: GameRecord[];
  recentgamerecordlistfutures: GameRecord[];
  seasonsummary: PitcherSeasonSummaryBase | BatterSeasonSummaryBase;
  seasonsummaryfutures: PitcherSeasonSummaryBase | BatterSeasonSummaryBase;
  yearrecordlist: (PitcherSeasonSummaryBase | BatterSeasonSummaryBase)[];
}

export interface Pitcher extends Player {
  recentgamerecordlist: GameRecord[];
  recentgamerecordlistfutures: GameRecord[];
  seasonsummary: PitcherSeasonSummaryBase;
  seasonsummaryfutures: PitcherSeasonSummaryBase;
}

export interface Batter extends Player {
  recentgamerecordlist: GameRecord[];
  recentgamerecordlistfutures: GameRecord[];
  seasonsummary: BatterSeasonSummaryBase;
  seasonsummaryfutures: BatterSeasonSummaryBase;
}

export type SeasonSummary = PitcherSeasonSummaryBase | BatterSeasonSummaryBase;
export type RecentRecord = GameRecord;
export type YearRecord = PitcherSeasonSummaryBase | BatterSeasonSummaryBase;
