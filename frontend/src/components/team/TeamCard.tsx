import "@/components/team/TeamLogo";
import TeamLogo from "@/components/team/TeamLogo";
import Link from "next/link";

export interface TeamCardInterface {
  id: number;
  name: string;
  department: string;
  established: number;
  size: number;
  logo: string;
}

export default function TeamCard({ team }: { team: TeamCardInterface }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 gap-4 p-4">
        <div className="flex justify-start">
          <div className="flex justify-center items-center">
            <TeamLogo logo={team.logo} width={70} height={70} />
          </div>
        </div>
        <div className="flex flex-col grow justify-center gap-2">
          <div>
            <h3 className="text-xl">{team.name}</h3>
            <span className="text-gray-700">{team.department}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">EST. {team.established}</span>
            <span className="text-gray-500">{team.size} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
