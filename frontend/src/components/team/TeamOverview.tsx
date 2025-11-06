import teams from "@/data/teams.json";
import teamCard, { TeamCardInterface } from "@/components/team/TeamCard";

const footballTeams = teams as TeamCardInterface[];

export default function TeamCard() {
  return (
    <div className="grid gap-4">
      {footballTeams.map((t: TeamCardInterface) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}
