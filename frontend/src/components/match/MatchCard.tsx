import TeamBadge from "@/components/team/TeamBadge";
import type { Match } from "@/lib/schemas/matchSchema";
import Link from "next/link";
import { splitKickoffTime } from "@/lib/utils/splitKickoffTime";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { date, time } = splitKickoffTime(match.kickoff);
  const logoPathHomeTeam = `/logos/${match.homeTeam.abbreviation}.svg`;
  const logoPathAwayTeam = `/logos/${match.awayTeam.abbreviation}.svg`;
  return (
    <Link href={`/match/${match.id}`}>
      <div
        className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4
        w-full
        sm:w-[400px]
        md:w-[500px]
        lg:w-[800px]
        h-[110px]
        sm:h-[115px]
        md:h-[150px]
        px-4 sm:px-5
        transition-all duration-200
        hover:shadow-md hover:-translate-y-1
        cursor-pointer"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <TeamBadge
              name={match.homeTeam.name}
              abbreviation={match.homeTeam.abbreviation}
              logo={logoPathHomeTeam}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <span className="px-3 py-0.5 rounded-full bg-neutral-100 text-[11px] font-medium text-neutral-700">
              VS
            </span>

            <div className="flex flex-col items-center text-sm font-medium text-neutral-700 leading-tight mt-0.5">
              <div className="tabular-nums text-sm font-medium text-neutral-700 leading-tight mt-0.5">
                {date} • {time}
              </div>
              <div className="text-xs text-neutral-500 leading-tight mt-0.5">
                {match.venue}
              </div>
            </div>
          </div>
          <div className="justify-self-end">
            <TeamBadge
              name={match.awayTeam.name}
              abbreviation={match.awayTeam.abbreviation}
              logo={logoPathAwayTeam}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
