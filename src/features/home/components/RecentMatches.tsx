import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router';
import { endOfWeek, format, parse, startOfWeek } from 'date-fns';

import { ScheduleInfo } from '@/features/game';
import { useGetMatchScheduleQuery } from '@/features/game/apis/match-schedule/matchScheduleApi.query';
import { cn, formatDate, isDateWithinWeek } from '@/lib/utils';

interface RecentMatchesProps {
  match: ScheduleInfo | undefined;
}

function RecentMatches({ match }: RecentMatchesProps) {
  const today = format(new Date(), 'yyyyMMdd');
  const {
    matchData: matchOfMonth,
    isLoading,
    isSuccess,
    isError,
  } = useGetMatchScheduleQuery({
    currentMonth: parse(
      match?.gameDate.toString() || today,
      'yyyyMMdd',
      new Date()
    ),
  });
  const navigate = useNavigate();
  const matchesOfWeek = useMemo(() => {
    if (!match) {
      return []; // 데이터가 없을 경우 빈 배열 반환
    }

    const dateOfToday = parse(
      match.gameDate.toString(),
      'yyyyMMdd',
      new Date()
    ); // 날짜 문자열을 Date 객체로 변환
    const startOfTheWeek = startOfWeek(dateOfToday, { weekStartsOn: 1 });
    const endOfTheWeek = endOfWeek(dateOfToday, { weekStartsOn: 1 });

    return matchOfMonth
      .filter((matchData) => {
        const date = parse(matchData.displayDate, 'yyyyMMdd', new Date()); // 날짜 문자열을 Date 객체로 변환
        return (
          matchData.gmkey !== match.gmkey &&
          isDateWithinWeek(date, {
            startDate: startOfTheWeek,
            endDate: endOfTheWeek,
          })
        );
      })
      .reverse(); // 최신순으로 정렬하기 위해 reverse
  }, [matchOfMonth, match]);

  return (
    <div className="w-full h-full md:h-[75%]">
      <h3 className={cn('h-6 px-2 py-1 font-bold text-sm', 'lg:text-base')}>
        금주의 다른 경기
      </h3>
      <ul
        className={cn(
          'h-[calc(100%-24px)] flex flex-col items-center overflow-y-scroll'
        )}
      >
        {isError && (
          <li className="h-full flex items-center justify-center px-2 break-keep">
            경기 정보를 불러오는 중에 에러가 발생하였습니다.
          </li>
        )}
        {isSuccess &&
          matchesOfWeek.map((match) => (
            <li key={match.gmkey} className="w-full p-2 border-b ">
              {isLoading ? (
                <Skeleton className="w-full h-16" baseColor="#d1d5db" />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/game/regular/boxscore/${match.gameDate}/${match.gmkey}`
                    )
                  }
                  onKeyDown={() =>
                    navigate(
                      `/game/regular/boxscore/${match.gameDate}/${match.gmkey}`
                    )
                  }
                >
                  <p
                    className={cn(
                      'font-semibold mb-1 text-[0.6rem]',
                      'lg:text-xs'
                    )}
                  >
                    {formatDate(match.displayDate)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12">
                      <img src={match.homeLogo} alt={match.homeKey} />
                    </div>
                    <div className="font-bold text-2xl">
                      {match.outcome.length === 0 && '경기 전'}
                      {match.outcome.length > 0 &&
                        match.outcome === '취' &&
                        '취소'}
                      {match.outcome.length > 0 &&
                        match.outcome !== '취' &&
                        `${match.homeScore} : ${match.visitScore}`}
                    </div>
                    <div className="w-12 h-12">
                      <img src={match.visitLogo} alt={match.visitKey} />
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RecentMatches;
