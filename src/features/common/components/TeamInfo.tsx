export interface TeamData {
  teamName: string | undefined;
  logoUrl: string | undefined;
  result?: number | 'lose' | 'win';
  spectators?: number;
  stadium?: string; // BoxScoreTab에서만 사용
  tabType: 'MatchBoard' | 'MatchScheduleTab';
}

const TeamInfo = ({
  teamName,
  logoUrl,
  result,
  stadium,
  tabType,
}: TeamData) => {
  const isMatchBoard = tabType === 'MatchBoard';

  return (
    <div
      className={`w-full flex flex-col items-center ${
        isMatchBoard ? '' : 'gap-4'
      } `}
    >
      <img
        src={logoUrl}
        alt="team logo"
        className={`${
          isMatchBoard ? 'w-24 h-auto md:w-28 lg:w-32 ' : 'w-24 h-auto'
        }`}
      />
      {isMatchBoard ? (
        <div>
          <p className="text-center md:text:lg lg:text-2xl text-white font-semibold">
            {result && result}
          </p>
          <p
            className={`${
              isMatchBoard
                ? 'text-wiz-white text-opacity-30 text-center text-sm md:text-base'
                : 'text-xs md:text-sm font-medium leading-none text-white'
            }`}
          >
            {teamName}({isMatchBoard && stadium ? stadium : `관중: ${2000}명`})
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p
            className={`${
              isMatchBoard
                ? 'text-wiz-white text-opacity-30 text-center'
                : 'leading-none text-white text-base md:text-xl'
            }`}
          >
            {teamName}
            {isMatchBoard && stadium ? stadium : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export { TeamInfo };
