import { useQueries } from '@tanstack/react-query';
import { getPlayerImage } from '../../apis/boxscore/player-image';

export function usePlayerImages(players: { team: string; name: string }[]) {
  return useQueries({
    queries: players.map((player) => ({
      queryKey: ['playerImage', player.team, player.name],
      queryFn: () => getPlayerImage(player.team, player.name),
      staleTime: 5 * 60 * 1000, //5분,
      select: (data: string) => {
        return {
          playerName: player.name,
          image: data,
        };
      },
    })),
  });
}
