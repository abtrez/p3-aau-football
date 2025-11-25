import "@/components/team/TeamLogo";
import TeamLogo from "@/components/team/TeamLogo";
import { Person } from "@/lib/schemas/personSchema";
import type { Team } from "@/lib/schemas/teamSchema";
import Link from "next/link";

import { fetchPersonsFromTeamId } from "@/lib/fetchPersonFromTeam";

interface TeamCardProps {
  team: Team;
}

export default async function TeamCard({ team }: TeamCardProps) {
  const members: Person[] = await fetchPersonsFromTeamId(team.id);
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 gap-4 p-4">
        <div className="flex justify-start">
          <div className="flex justify-center items-center">
            <TeamLogo logo={"/placeholder-logo.png"} width={70} height={70} />
          </div>
        </div>
        <div className="flex flex-col grow justify-center gap-2">
          <div>
            <h3 className="text-xl">{team.name}</h3>
            <span className="text-gray-700">{team.department}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">EST. {team.yearEstablished}</span>
            <span className="text-gray-500">{members.length} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
