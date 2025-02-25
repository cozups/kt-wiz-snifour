import { startingPitcherColumns } from '@/constants/columns/starting-pitcher-columns';
import { DataTable } from '@/features/common';
import { StartingPitcher } from '../../types/watch-point';

interface StartingPitcherProps {
  homeTeam: string;
  visitTeam: string;
  homePitcher?: StartingPitcher;
  visitPitcher?: StartingPitcher;
}

const StartingPitcherTable = ({
  homeTeam = '',
  visitTeam = '',
  homePitcher,
  visitPitcher,
}: StartingPitcherProps) => {
  const pitcherData = [
    {
      team: homeTeam || 'Home Team',
      playerName: homePitcher?.playerName || 'Home Player',
      era: homePitcher?.era,
      start: homePitcher?.start,
      w: homePitcher?.w,
      l: homePitcher?.l,
      sv: homePitcher?.sv,
      hold: homePitcher?.hold,
      wra: homePitcher?.wra,
      innDisplay: homePitcher?.innDisplay,
      hit: homePitcher?.hit,
      hr: homePitcher?.hr,
      bb: homePitcher?.bb,
      hp: homePitcher?.hp,
      kk: homePitcher?.kk,
      r: homePitcher?.r,
      er: homePitcher?.er,
    },
    {
      team: visitTeam || 'Visit Team',
      playerName: visitPitcher?.playerName || 'Visit Player',
      era: visitPitcher?.era,
      start: visitPitcher?.start,
      w: visitPitcher?.w,
      l: visitPitcher?.l,
      sv: visitPitcher?.sv,
      hold: visitPitcher?.hold,
      wra: visitPitcher?.wra,
      innDisplay: visitPitcher?.innDisplay,
      hit: visitPitcher?.hit,
      hr: visitPitcher?.hr,
      bb: visitPitcher?.bb,
      hp: visitPitcher?.hp,
      kk: visitPitcher?.kk,
      r: visitPitcher?.r,
      er: visitPitcher?.er,
    },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <DataTable
        data={pitcherData}
        columns={startingPitcherColumns}
        domain="all"
      />
    </div>
  );
};

export { StartingPitcherTable };
