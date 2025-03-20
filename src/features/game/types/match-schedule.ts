import { RecentMatches } from '@/features/game';

export interface GameScheduleResponse {
  data: {
    list: GameSchedule[];
  };
}

// 오늘 스케줄(임시-데이터확인 되면 수정 필요)
export interface TodayGameScheduleResponse {
  data: {
    ktwiztodaygame: GameSchedule[];
    otherteamlist: GameSchedule[];
  };
}

export interface GameSchedule {
  broadcast: string;
  displayDate: string;
  gameDate: string;
  gmkey: string;
  gtime: string;
  home: string;
  homeKey: string;
  homeLogo: string;
  homeScore: number;
  matchTeamCode: string;
  matchTeamName: string;
  outcome: string;
  stadium: string;
  stadiumKey: string;
  status: string;
  visit: string;
  visitKey: string;
  visitLogo: string;
  visitScore: number;
}

// 최근 경기 일정
export interface RecentGameScheduleResponse {
  data: {
    current: RecentMatches;
    prev?: RecentMatches;
    next?: RecentMatches;
  };
}
