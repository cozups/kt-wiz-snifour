import { GameSchedule } from "@/features/game";

export interface StartingPitcher {
  babip: string;
  bb: number;
  bf: number;
  bk: number;
  bs: number;
  er: number;
  era: string;
  err: number;
  fip: string;
  fo: number;
  gamenum: number;
  go: number;
  gyear: string;
  havg: string;
  hit: number;
  hold: number;
  hp: number;
  hr: number;
  ib: number;
  inn2: number;
  innDisplay: string;
  kbb: string;
  kk: number;
  l: number;
  oavg: string;
  pcode: string;
  playerName: string;
  qs: number;
  qsPlus: number;
  r: number;
  ravg: string;
  sf: number;
  sh: number;
  sho: number;
  start: number;
  sv: number;
  svo: number;
  tugucount: number;
  turfSave: number;
  w: number;
  wCg: number;
  war: string;
  whip: string;
  winShares: string;
  wl: string;
  wp: number;
  wra: string;
}

export interface GameScore {
  bhomeName: string; // 경기 초/말 여부 ("말")
  displayDate: string; // 경기 날짜 및 시간 (표시용)
  endFlag: string; // 경기 종료 상태 플래그
  gameDate: string; // 경기 날짜 (YYYYMMDD 형식)
  gmKey: string; // 경기 고유 키
  gtime: string; // 경기 시작 시간
  hOutcome: string; // 홈팀 결과 ("승" 또는 "패")
  home: string; // 홈팀 이름
  homeKey: string; // 홈팀 코드
  homeLogo: string; // 홈팀 로고 URL
  homeYn: string; // 홈팀 여부 ("Y")
  hpcode: string; // 홈팀 투수 코드
  hpitcherName: string; // 홈팀 투수 이름
  hscore: number; // 홈팀 점수
  inning: number; // 경기 이닝 수
  stadium: string; // 경기장 이름
  stadiumKey: string; // 경기장 코드
  tbSc: string; // 초/말 구분 ("T" 또는 "B")
  vOutcome: string; // 원정팀 결과 ("승" 또는 "패")
  visit: string; // 원정팀 이름
  visitKey: string; // 원정팀 코드
  visitLogo: string; // 원정팀 로고 URL
  vpcode: string; // 원정팀 투수 코드
  vpitcherName: string; // 원정팀 투수 이름
  vscore: number; // 원정팀 점수
}

export interface Lineup {
  backnum: string; // 등번호
  birth: string; // 생년월일 (YYYYMMDD 형식)
  career: string; // 경력
  curBra: string; // 현재 타율
  curHra: string; // 현재 홈런율
  height: string; // 키 (cm)
  hittype: string; // 투타 유형
  money: string; // 연봉
  pcode: string; // 선수 코드
  playerName: string; // 선수 이름
  playerPrvwImg: string; // 선수 이미지 URL
  pos: string; // 포지션 번호
  posidName: string; // 포지션 약어
  position: string; // 포지션 풀네임
  promise: string; // 계약금
  seq: number; // 선수 순서
  teamCode: string; // 팀 코드
  teamName: string; // 팀 이름
  weight: string; // 몸무게 (kg)
}

export interface TeamRank {
  ab: number; // 타석 수
  bra: string; // 팀 타율
  continue1: string; // 연승/연패 기록 (예: "3승")
  drawn: number; // 무승부 수
  er: number; // 자책점
  era: string; // 평균자책점
  game: number; // 경기 수
  gameFlag: number; // 경기 상태 플래그
  gb: string; // 게임차
  gyear: string; // 시즌 연도
  hr: number; // 홈런 수
  hra: string; // 홈런율
  lastrank: number; // 이전 순위
  lose: number; // 패배 수
  lra: string; // 패배율
  r: number; // 실점
  rank: number; // 현재 순위
  run: number; // 득점
  sb: number; // 도루 수
  teamCode: string; // 팀 코드
  teamName: string; // 팀 이름
  teamNameEng: string; // 팀 이름 (영문)
  win: number; // 승리 수
  wra: string; // 승률
}

export interface TeamWinLose {
  drawn: number; // 무승부 수
  lose: number; // 패배 수
  teamCode: string; // 팀 코드
  teamName: string; // 팀 이름
  vsTeamCode: string; // 상대 팀 코드
  win: number; // 승리 수
}

export interface Schedule {
  current: GameSchedule; // 현재 경기 일정
  next: GameSchedule; // 다음 경기 일정
  prev: GameSchedule; // 이전 경기 일정
}

// 최근 경기
export interface RecentMatches {
  displayDate: string;
  game: string;
  gameDate: number;
  gday: number;
  gmkey: string;
  gmonth: number;
  gtime: string;
  gyear: string;
  home: string;
  homeDecision: string;
  homeDecisionPitcher: string;
  homeFullname: string;
  homeKey: string;
  homeLogo: string;
  homeScore: 4;
  homeStarter: string;
  matchTeamCode: string;
  matchTeamName: string;
  outcome: string;
  stadium: string;
  stadiumKey: string;
  status: string;
  visit: string;
  visitDecision: string;
  visitDecisionPitcher: string;
  visitFullname: string;
  visitKey: string;
  visitLogo: string;
  visitScore: 1;
  visitStarter: string;
}

export interface WatchPointData {
  gameScore: GameScore;
  homeLineup: Lineup[];
  homePitcher: StartingPitcher;
  homeTeamRank: TeamRank;
  homeTeamWinLose: TeamWinLose;
  schedule: Schedule;
  visitLineup: Lineup[];
  visitPitcher: StartingPitcher;
  visitTeamRank: TeamRank;
  visitTeamWinLose: TeamWinLose;
}
