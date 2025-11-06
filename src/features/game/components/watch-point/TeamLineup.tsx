import { Lineup } from "@/features/game";
import { TeamLineupAnimation } from "./TeamLineupAnimation";

const TeamLineup = ({ data, logoUrl }: { data: Lineup[]; logoUrl: string }) => {
  const positionData: Record<string, { style: string; label: string }> = {
    "1": {
      style: "absolute top-40 left-32  md:top-52 md:left-40 lg:bottom-44 lg:left-40",
      label: "P",
    },
    "2": {
      style: "absolute bottom-20 left-32 md:bottom-24 md:left-40 lg:bottom-24 lg:left-40",
      label: "2",
    },
    "3": {
      style: "absolute top-44 right-16 md:top-56 md:right-16 lg:bottom-44 lg:right-20",
      label: "3",
    },
    "4": {
      style: "absolute bottom-36 right-16 md:bottom-48 md:right-24 lg:bottom-48 lg:right-24",
      label: "4",
    },
    "5": {
      style: "absolute top-44 left-16 md:top-56 md:left-20 lg:bottom-44 lg:left-24",
      label: "5",
    },
    "6": {
      style: "absolute bottom-36 left-20 md:bottom-48 md:left-28 lg:bottom-48 lg:left-28",
      label: "6",
    },
    "7": {
      style: "absolute top-28 left-16 md:top-32 md:left-16 lg:top-34 lg:left-20",
      label: "7",
    },
    "8": {
      style: "absolute top-24 left-32 md:top-28 md:left-40 lg:top-28 lg:left-40",
      label: "8",
    },
    "9": {
      style: "absolute top-28 right-12 md:top-32 md:right-16 lg:top-34 lg:right-20",
      label: "9",
    },
    D: {
      style: "absolute bottom-16 left-16 md:bottom-20 md:left-16",
      label: "D",
    },
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <img src={logoUrl} alt="team logo" className="w-24 h-auto" />
      <div className="w-[300px] md:w-[380px] relative mt-2 p-10 bg-wiz-white bg-opacity-10 rounded-xl">
        <img src="/assets/ground.png" alt="diamond" className="w-full h-auto" />
        {data.map((player, index) => (
          <TeamLineupAnimation
            key={player.pcode}
            player={player}
            position={positionData[player.pos]}
            delay={index * 15}
          />
        ))}
      </div>
    </div>
  );
};

export { TeamLineup };
