import { GameScore } from '@/features/game';
import { getWatchPointChartData } from '@/features/game/services/calc-rate-watchpoint.service';
import { cn } from '@/lib/utils';
import { StartingPitcher } from '../../types/watch-point';

interface StartingPitcherChartProps {
  gameScore: GameScore;
  homePitcher: StartingPitcher;
  visitPitcher: StartingPitcher;
}

function StartingPitcherChart({
  gameScore,
  homePitcher,
  visitPitcher,
}: StartingPitcherChartProps) {
  if (!homePitcher || !visitPitcher) {
    return <div>두 팀의 데이터가 필요합니다.</div>;
  }

  const data = getWatchPointChartData(homePitcher, visitPitcher);

  return (
    <div className="w-full flex items-center justify-between">
      <div className={cn('w-1/6 flex flex-col items-center justify-center')}>
        <img src={gameScore.homeLogo} alt={gameScore.home} />
        <span className="text-xs md:text-base">{homePitcher.playerName}</span>
      </div>
      <div
        className={cn(
          'w-[calc(66%-2rem)] flex flex-col items-center gap-1 py-6',
          'md:gap-2',
          'lg:w-[calc(66%-8rem)]'
        )}
      >
        {data.map((stat) => (
          <div
            className={cn('w-full flex items-center justify-center gap-2')}
            key={stat.label}
          >
            <div
              className={cn(
                'w-[calc((100%-1rem)/2)] flex items-center justify-end'
              )}
            >
              <div
                className={cn(
                  'h-2 rounded-l-full',
                  'md:h-4',
                  stat.win === 'h' ? 'bg-wiz-red' : 'bg-neutral-600'
                )}
                style={{
                  width: stat.home,
                }}
              />
            </div>
            <p
              className={cn(
                'w-16 text-[0.6rem] text-center font-semibold',
                'md:w-20 md:text-sm',
                'lg:w-24'
              )}
            >
              {stat.label}
            </p>
            <div className="w-[calc((100%-1rem)/2)] flex items-center">
              <div
                className={cn(
                  'h-2 rounded-r-full',
                  'md:md:h-4',
                  stat.win === 'v' ? 'bg-wiz-red' : 'bg-neutral-600'
                )}
                style={{
                  width: stat.visit,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/6 flex flex-col items-center justify-center">
        <img src={gameScore.visitLogo} alt={gameScore.visit} />
        <span className="text-xs md:text-base">{visitPitcher.playerName}</span>
      </div>
    </div>
  );
}

export { StartingPitcherChart };
