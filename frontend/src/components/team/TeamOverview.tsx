import TeamCard from "@/components/team/TeamCard";
import type { Team } from "@/lib/schemas/teamSchema";

interface TeamOverviewProps {
  teams: Team[];
}

export default function TeamOverview({ teams }: TeamOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {teams.map((t) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}
