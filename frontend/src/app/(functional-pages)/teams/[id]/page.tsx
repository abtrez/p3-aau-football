import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";
import { fetchTeamById } from "@/lib/fetchTeam";
import { Team } from "@/lib/schemas/teamSchema";
import { Person } from "@/lib/schemas/personSchema";

import Divider from "@mui/material/Divider";
import { fetchPersonsFromTeamId } from "@/lib/fetchPersonFromTeam";
import { fetchPersonFromTeamIdByRole } from "@/lib/fetchPersonFromRoleAndTeam";
import { fetchPersonById } from "@/lib/fetchPerson";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team: Team = await fetchTeamById(id);
  const members: Person[] = await fetchPersonsFromTeamId(id);
  const leader: Person[] = await fetchPersonFromTeamIdByRole(id, "Leader");
  const coach: Person[] = await fetchPersonFromTeamIdByRole(id, "Coach");

  //Fetch of the contact person
  let contactPerson: Person | null = null;
  if (team.contactPerson) {
    contactPerson = await fetchPersonById(team.contactPerson);
  }

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
        <InfoItem
          label="Contact Person"
          value={
            contactPerson
              ? `${contactPerson?.firstName} ${contactPerson?.lastName}`
              : "N/A"
          }
        />
        <InfoItem
          label="Leader"
          value={
            leader.length > 0
              ? leader
                  .map((leader) => `${leader.firstName} ${leader.lastName}`)
                  .join(", ")
              : "N/A"
          }
        />
        <InfoItem
          label="Coach"
          value={
            coach.length > 0
              ? coach
                  .map((coach) => `${coach.firstName} ${coach.lastName}`)
                  .join(", ")
              : "N/A"
          }
        />
        <InfoItem label="Established" value={team.yearEstablished || "N/A"} />
        <InfoItem label="Squad Size" value={members.length || "N/A"} />
        <InfoItem
          label="Assistant"
          value={
            coach.length > 0
              ? `${coach[1].firstName} ${coach[1].lastName}`
              : "N/A"
          }
        />
      </div>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Description
        </h3>
        <p className="text-sm leading-6 text-neutral-700">
          This is the profile page from {team.name} representing football for{" "}
          {team.department}, with {members.length} members.
        </p>
      </section>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Members
        </h3>
        {members.map((member) => (
          <div key={member.id} className="nb-1">
            <span className="font-medium">
              {member.firstName} {member.lastName}
            </span>
            {member.roles && member.roles.length > 0 && (
              <span className="text-sm text-neutral-600">
                {" "}
                — {member.roles.map((role) => role.name).join(",")}
              </span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
