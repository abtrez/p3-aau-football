import teams from "@/data/teams.json";
import TeamCard, { TeamCardInterface } from "@/components/team/TeamCard";

const footballTeams = teams as TeamCardInterface[];

export default function TeamOverview() {
  return (
    <div className="grid gap-4">
      {footballTeams.map((t: TeamCardInterface) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}
