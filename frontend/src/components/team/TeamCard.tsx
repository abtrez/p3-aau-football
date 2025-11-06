import "@/components/team/TeamLogo";
import TeamLogo from "@/components/team/TeamLogo";

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
    <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col w-[25%] bg-amber-300 items-center p-4">
        <div>
          <TeamLogo logo={team.logo} width={50} height={50} />
        </div>
      </div>
      <div className="flex flex-col grow bg-amber-500 p-4">TEAM INFO</div>
    </div>
  );
}
