import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';

import { Breadcrumb, SubTitle } from '@/features/common';
import {
  BattingRecordTable,
  KeyRecordsCard,
  MatchBoard,
  PitchingRecordTable,
} from '@/features/game';
import { useGetBoxscoreQuery } from './apis/boxscore/boxscoreApi.query';
import useGetRecentMatchScheduleQuery from './apis/match-schedule/RecentScheduleApi.query';

const BoxscoreTab = () => {
  const { gameDate, gameKey } = useParams<{
    gameDate: string;
    gameKey: string;
  }>();

  const {
    recentMatchData,
    loading: recentLoading,
    error: recentError,
  } = useGetRecentMatchScheduleQuery();

  const {
    data: matchData,
    isLoading,
    isError,
    error,
  } = useGetBoxscoreQuery(
    gameDate || recentMatchData?.data.current.displayDate || '',
    gameKey || recentMatchData?.data.current.gmkey || ''
  );

  if (recentError || isError) {
    return (
      <div>
        <p>Error: {recentError || error?.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center my-20">
      <div className="w-full flex flex-col justify-center items-center">
        {/* 경로 */}
        <Breadcrumb />

        {/* 경기 스코어 테이블 */}
        {isLoading || !matchData || recentLoading ? (
          <div className="bg-gray-200 animate-pulse rounded-lg w-full">
            <Skeleton height={340} className="w-full mb-10" />
          </div>
        ) : (
          <MatchBoard
            match={matchData.schedule.current}
            scoreboard={matchData.scoreboard}
            prevMatch={matchData.schedule.prev}
            nextMatch={matchData.schedule.next}
          />
        )}

        {/* 주요 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <SubTitle title="주요 기록" />
          {isLoading || !matchData || recentLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {Array.from({ length: 8 }).map(() => (
                <div
                  key={Math.random()}
                  className="h-[180px] md:h-[200px] lg:h-[220px] bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="w-full items-center mt-4">
              <KeyRecordsCard data={matchData} />
            </div>
          )}
        </div>
        {/* team1 타자 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle
              title={`${
                matchData?.schedule.current.home || 'Home Team'
              } 타자 기록`}
            />

            <div className="w-full">
              <BattingRecordTable data={matchData?.hbatters} />
            </div>
          </div>
        </div>
        {/* team2 타자 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle
              title={`${
                matchData?.schedule.current.visit || 'Visit Team'
              } 타자 기록`}
            />
            <div className="w-full">
              <BattingRecordTable data={matchData?.vbatters} />
            </div>
          </div>
        </div>
        {/* team1 투수 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle
              title={`${
                matchData?.schedule.current.home || 'Home Team'
              } 투수 기록`}
            />
            <div className="w-full">
              <PitchingRecordTable data={matchData?.hpitchers} />
            </div>
          </div>
        </div>
        {/* team2 투수 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle
              title={`${
                matchData?.schedule.current.visit || 'Visit Team'
              } 투수 기록`}
            />
            <div className="w-full">
              <PitchingRecordTable data={matchData?.vpitchers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BoxscoreTab };
