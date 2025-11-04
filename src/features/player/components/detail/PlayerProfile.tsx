import { LeagueRecord, PlayerInfo, PlayerProfileSkeleton } from "@/features/player";
import { usePlayer } from "@/features/player/hooks/usePlayer";
import { cn } from "@/lib/utils";

interface PlayerProfileProps {
  className: string;
}

function PlayerProfile({ className }: PlayerProfileProps) {
  const { data: player, isLoading } = usePlayer();

  if (isLoading) {
    return <PlayerProfileSkeleton />;
  }

  return (
    <div className={cn("w-full h-full flex flex-row gap-4", "lg:w-1/4 lg:flex-col", className)}>
      {/* 선수 이미지 */}
      <div className={cn("w-1/3 h-fit aspect-square bg-wiz-white rounded-xl overflow-hidden", "lg:w-full")}>
        <img src={player?.gameplayer.playerPrvwImg} alt="" className="w-full" />
      </div>
      <div className={cn("w-2/3 h-full flex items-center", "lg:w-full")}>
        {/* 선수 프로필 */}
        <div className={cn("w-full h-full flex flex-col gap-2 lg:gap-4")}>
          {/* 이름, 포지션 */}
          <PlayerInfo />
          {/* 정규 리그 성적 */}
          <LeagueRecord />
        </div>
      </div>
    </div>
  );
}

export { PlayerProfile };
