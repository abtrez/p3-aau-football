import TeamCard from "@/components/team/TeamCard";
import type { Team } from "@/lib/schemas/teamSchema";

interface TeamOverviewProps {
  teams: Team[];
}

export default function TeamOverview({ teams }: TeamOverviewProps) {
  return (
    <div className="grid gap-4">
      {teams.map((t) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}
