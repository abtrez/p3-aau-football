import TeamBadge from "@/components/Team/TeamBadge";

export interface MatchCardInterface {
  id: number;
  team1: string;
  team2: string;
  team1logo: string;
  team2logo: string;
  location: string;
  time: string;
}

export default function MatchCard({ match }: { match: MatchCardInterface }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <TeamBadge name={match.team1} logo={match.team1logo} />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            VS
          </span>

          <div className="flex flex-col items-center text-xs text-gray-500 leading-tight mt-1">
            <span className="tabular-nums">
              {new Date(match.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-center">{match.location}</span>
          </div>
        </div>
        <div className="justify-self-end">
          <TeamBadge name={match.team2} logo={match.team1logo} />
        </div>
      </div>
    </div>
  );
}
