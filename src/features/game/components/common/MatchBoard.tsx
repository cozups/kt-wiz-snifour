import { useNavigate } from 'react-router';
import { IconLeft, IconRight } from 'react-day-picker';

import { TeamData, TeamInfo } from '@/features/common';
import { ScheduleInfo, ScoreboardEntry } from '@/features/game/types/boxscore';
import { formatDate } from '@/lib/utils';
import { MatchScoreTable } from '@/features/game';

interface MatchBoardProps {
  match: ScheduleInfo;
  scoreboard: ScoreboardEntry[];
  prevMatch: ScheduleInfo;
  nextMatch: ScheduleInfo;
}

const MatchBoard = ({
  match,
  scoreboard,
  prevMatch,
  nextMatch,
}: MatchBoardProps) => {
  const navigate = useNavigate();

  const isCancelled = !!Number(match.cancelFlag);

  const homeTeam: TeamData = {
    teamName: match.home,
    logoUrl: match.homeLogo,
    result: match.hscore,
    stadium: '홈',
    tabType: 'MatchBoard',
  };

  const visitTeam: TeamData = {
    teamName: match.visit,
    logoUrl: match.visitLogo,
    result: match.vscore,
    stadium: '원정',
    tabType: 'MatchBoard',
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      navigate(
        `/game/regular/boxscore/${prevMatch.gameDate}/${prevMatch.gmkey}`
      );
    } else {
      navigate(
        `/game/regular/boxscore/${nextMatch.gameDate}/${nextMatch.gmkey}`
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-between px-8 py-6 gap-4 bg-wiz-white bg-opacity-10 rounded overflow-hidden">
      {/* 날짜 헤더 */}
      <div className="flex justify-center items-center gap-6 md:gap-10 text-white px-4 py-4">
        <button
          type="button"
          disabled={prevMatch === undefined}
          onClick={() => handleDateChange('prev')}
          className={`flex items-center justify-center text-lg font-semibold text-white bg-wiz-white bg-opacity-30 w-8 h-8 md:w-10 md:h-10 rounded ${
            prevMatch === undefined
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-wiz-white hover:bg-opacity-20'
          }`}
        >
          <IconLeft className="w-2/5 h-auto" />
        </button>
        <div className="relative flex flex-col items-center md:gap-1">
          <span className="text-lg md:text-xl lg:text-2xl font-semibold">
            {formatDate(match.gameDate.toString()) || '정보 없음'}
          </span>
          <span className="text-center text-wiz-white text-opacity-50 text-sm md:text-md lg:text-lg">
            {match.gtime} | {match.stadium}
            {!isCancelled && ` | 관중: ${match.crowdCn.toLocaleString()}명`}
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleDateChange('next')}
          disabled={nextMatch === undefined}
          className={`flex items-center justify-center text-lg font-semibold text-white bg-wiz-white bg-opacity-30 w-8 h-8 md:w-10 md:h-10 rounded ${
            nextMatch === undefined
              ? 'opacity-30'
              : 'hover:bg-wiz-white hover:bg-opacity-20'
          }`}
        >
          <IconRight className="w-2/5 h-auto" />
        </button>
      </div>

      {/* MatchBoard 메인 콘텐츠 */}
      <div className="w-full">
        {isCancelled && (
          <div className="w-full h-48 flex items-center justify-center bg-wiz-black rounded">
            <h3 className="text-white text-2xl font-semibold">
              경기가 취소되었습니다.
            </h3>
          </div>
        )}

        {/* 작은 화면 레이아웃 */}
        {!isCancelled && (
          <>
            <div className="flex flex-col items-center justify-center gap-4 sm:hidden">
              <div className="flex flex-row items-center justify-between gap-6">
                {/* team1 */}
                <TeamInfo {...homeTeam} />
                {/* team2 */}
                <TeamInfo {...visitTeam} />
              </div>
              {/* 경기 테이블 */}
              <div className="w-full">
                <MatchScoreTable data={scoreboard} />
              </div>
            </div>

            {/* 큰 화면 레이아웃 */}
            <div className="hidden sm:flex items-center justify-between px-8 py-6 gap-4 rounded overflow-x-scroll">
              {/* team1 */}
              <TeamInfo {...homeTeam} />
              {/* 경기 테이블 */}
              <div>
                <MatchScoreTable data={scoreboard} />
              </div>
              {/* team2 */}
              <TeamInfo {...visitTeam} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { MatchBoard };
