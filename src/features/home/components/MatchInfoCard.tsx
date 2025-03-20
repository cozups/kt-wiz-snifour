import { ReactNode, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn, findBroadCast, formatDate } from '@/lib/utils';
import { ScheduleInfo } from '@/features/game';

interface MatchInfoHeaderProps {
  match:
    | {
        current: ScheduleInfo;
        next?: ScheduleInfo;
        prev?: ScheduleInfo;
      }
    | undefined;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  loading: boolean;
  prefetch: (gameDate: string, gmkey: string) => void;
}

function MatchInfoHeader({
  match,
  handlePrevDay,
  handleNextDay,
  loading,
  prefetch,
}: MatchInfoHeaderProps) {
  const matchOfToday = match?.current;

  useEffect(() => {
    if (match?.prev) {
      prefetch(
        match?.prev?.gameDate.toString() || '',
        match?.prev?.gmkey || ''
      );
    }
    if (match?.next) {
      prefetch(
        match?.next?.gameDate.toString() || '',
        match?.next?.gmkey || ''
      );
    }
  }, [match?.next, match?.prev, prefetch]);

  return (
    <CardHeader className="w-full flex flex-row items-center justify-between">
      {loading ? (
        <div className="w-full">
          <Skeleton className="w-full h-12" baseColor="#d1d5db" />
        </div>
      ) : (
        <>
          <ChevronLeft
            className={cn('cursor-pointer', !match?.prev && 'invisible')}
            onClick={handlePrevDay}
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-sm lg:text-lg">
              {formatDate(matchOfToday?.gameDate.toString())}
            </h3>
            <p className="text-gray-600 text-xs lg:text-sm">
              {matchOfToday?.stadium} {matchOfToday?.gtime}
            </p>
          </div>
          <ChevronRight
            className={cn('cursor-pointer', !match?.next && 'invisible')}
            onClick={handleNextDay}
          />
        </>
      )}
    </CardHeader>
  );
}

function MatchInfoContent({
  match,
  loading,
}: {
  match: ScheduleInfo | undefined;
  loading: boolean;
}) {
  const gameBroadcast = useMemo(() => {
    return match?.broadcast ? findBroadCast(match?.broadcast) : [];
  }, [match?.broadcast]);

  return (
    <CardContent className="w-[75%] flex flex-col items-center py-4 lg:py-12">
      <div className="w-full flex items-center justify-center">
        <div className="flex-1 flex items-center justify-between lg:gap-16">
          {/* 홈 로고 */}
          <div className="w-20 h-20 lg:w-40 lg:h-40">
            {loading ? (
              <Skeleton className="w-full h-full" baseColor="#d1d5db" />
            ) : (
              <img src={match?.homeLogo} alt={match?.homeKey} />
            )}
          </div>
          {/* 경기 결과 */}
          <div className="w-32 flex flex-col items-center justify-end">
            <div className="font-bold text-3xl md:text-5xl mt-4 lg:mt-8">
              {loading && (
                <Skeleton
                  className="w-24 h-12 md:w-32 md:h-16 lg:w-36 lg:h-20"
                  baseColor="#d1d5db"
                />
              )}
              {!loading && match?.cancelFlag === '1' && '취소'}
              {!loading &&
                match?.cancelFlag !== '1' &&
                `${match?.hscore} : ${match?.vscore}`}
            </div>
            <button
              type="button"
              className={cn(
                'flex justify-center items-center gap-2 bg-wiz-red rounded px-2 mt-4 text-white',
                'md:px-3 md:py-1',
                'lg:px-4 lg:mt-8'
              )}
              disabled={loading}
            >
              <Link
                to={`/game/regular/boxscore/${match?.gameDate}/${match?.gmkey}`}
                className="flex items-center justify-center text-[0.6rem] md:text-xs lg:text-base"
              >
                경기정보{' '}
                <ChevronRight className={cn('w-4', 'md:w-4', 'lg:w-6')} />
              </Link>
            </button>
          </div>
          {/* 원정 로고 */}
          <div className="w-20 h-20 lg:w-40 lg:h-40">
            {loading ? (
              <Skeleton className="w-full h-full" baseColor="#d1d5db" />
            ) : (
              <img src={match?.visitLogo} alt={match?.visitKey} />
            )}
          </div>
        </div>
      </div>

      {/* 배너 */}
      <div className="w-full flex items-center justify-center gap-4 mt-6 md:mt-16 lg:mt-16">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex-1 h-8 bg-wiz-red flex items-center justify-center text-white rounded cursor-pointer text-xs lg:h-16 lg:text-lg">
              중계 안내
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-fit">
            {/* 그 날의 중계정보*/}
            <div className="flex flex-col items-start gap-2">
              {loading ? (
                <Skeleton
                  className="w-56 h-5 md:w-72 md:h-6 lg:w-96 lg:h-8"
                  count={2}
                  baseColor="#d1d5db"
                />
              ) : (
                gameBroadcast.map((br) =>
                  br.channels.length > 0 ? (
                    <div key={br.platform} className="flex items-center gap-2">
                      <p className="bg-wiz-black min-w-14 text-center text-white px-2 py-1 rounded text-[0.6rem] lg:text-xs">
                        {br.platform}
                      </p>
                      <p className="text-[0.6rem] lg:text-sm">{br.channels}</p>
                    </div>
                  ) : null
                )
              )}
            </div>
          </PopoverContent>
        </Popover>
        <Link
          to="/wizpark/parking"
          className={cn(
            "flex-1 h-8 flex items-center justify-center overflow-hidden text-xs rounded relative cursor-pointer bg-[url('/assets/parking.png')] bg-cover",
            "after:content-[''] after:w-full after:h-full after:bg-black after:bg-opacity-30 after:absolute after:top-0 after:left-0",
            'lg:h-16 lg:text-lg'
          )}
        >
          <p className="text-center text-white z-[1]">사전 주차 예약</p>
        </Link>
      </div>
    </CardContent>
  );
}

function MatchInfoCard({ children }: { children: ReactNode }) {
  return (
    <Card
      className={cn(
        'w-full h-full px-2 pb-2 flex flex-col items-center border-none shadow-none',
        'md:w-[75%] md:px-4 md:pb-4',
        'lg:px-8 lg:pb-8'
      )}
    >
      {children}
    </Card>
  );
}

MatchInfoCard.Header = MatchInfoHeader;
MatchInfoCard.Content = MatchInfoContent;

export default MatchInfoCard;
