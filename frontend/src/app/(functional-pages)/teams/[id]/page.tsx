import NotFound from "@/app/not-found";
import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";
import { fetchTeamById } from "@/lib/fetchTeam";
import { Team } from "@/lib/schemas/teamSchema";
import { Person } from "@/lib/schemas/personSchema";



import Divider from "@mui/material/Divider";
import { fetchPersonsFromTeamId } from "@/lib/fetchPersonFromTeam";
import { fetchPersonsFromRoleAndTeamId } from "@/lib/fetchPersonFromRoleAndTeam";

export default async function Page({ params }: any) {
  const { id } = await params;
  const team: Team = await fetchTeamById(id);
  const members: Person[] = await fetchPersonsFromTeamId(id);
  //const leader: Person[] = await fetchPersonsFromRoleAndTeamId(id,["leader"]);
  //const coach: Person[] = await fetchPersonsFromRoleAndTeamId(id,["coach"]);


  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {team.name}
        </h1>
      </div>
      <Divider sx={{ borderBottomWidth: 3, my: 3 }} />
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Contact Person" value= {team.contactPerson || "N/A"}/>
        <InfoItem label="Leader" value= {/*leader[0]?.firstName|| */"N/A"} />
        <InfoItem label="Coach" value= {/*coach[0]?.firstName|| */ "N/A"} />
        <InfoItem label="Established" value= {team.yearEstablished|| "N/A"} />
        <InfoItem label="Squad Size" value= {/*members.length||*/ "N/A"} />
        <InfoItem label="Assistant" value= "N/A"/>
      </div>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Description
        </h3>
        <p className="text-sm leading-6 text-neutral-700">
          This is the profile page from {team.name} representing football for {team.department}, with {members.length} members. 
        </p>
      </section>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Members
        </h3>
        {members.map((m)=> (
          <div key={m.id}>{m.firstName} {m.lastName}</div>
        ))}
      </section>
    </div>
  );
}
