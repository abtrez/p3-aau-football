import TeamBadge from "@/components/team/TeamBadge";
import type { Match } from "@/lib/schemas/matchSchema";
import Link from "next/link";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <Link href={`/match/${match.id}`}>
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <TeamBadge
              name={match.homeTeam.name}
              logo="/placeholder-logo.png"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
              VS
            </span>

            <div className="flex flex-col items-center text-xs text-gray-500 leading-tight mt-1">
              <span className="tabular-nums">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-center">{'"Domen"'}</span>
            </div>
          </div>
          <div className="justify-self-end">
            <TeamBadge
              name={match.awayTeam.name}
              logo="/placeholder-logo.png"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
