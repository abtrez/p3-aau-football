"use server";

import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";

import Divider from "@mui/material/Divider";

import { fetchPersonById } from "@/lib/fetchPerson";
import { fetchTeamById } from "@/lib/fetchTeam";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = await fetchPersonById(id);
  let team;

  if (player.teamId) {
    team = await fetchTeamById(player.teamId);
  }

  return (
    <div className="container overflow-auto mx-auto">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {player.firstName} {player.lastName}
        </h1>
        <h2 className="text-2xl font-semibold  text-neutral-900 text-center -m-4">
          {team ? team.name : player.teamId}
        </h2>
      </div>
      <Divider sx={{ borderBottomWidth: 3, my: 3 }} />
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Wins" value={67} />
        <InfoItem label="Losses" value={0} />
        <InfoItem label="Draws" value={0} />
        <InfoItem label="Played" value={67} />
        <InfoItem label="Win Percentage" value={`${100}%`} />
        <InfoItem label="Goals" value={452} />
        <InfoItem label="Assists" value={231} />
        <InfoItem label="Discipline" value={`Y (${768}) R (${1296})`} />
        <InfoItem label="Shirt Number" value={100} />
        <InfoItem label="Position" value={"GK"} />
        <InfoItem label="Age" value={89} />
        <InfoItem label="Joined Team" value={2025} />
      </div>
    </div>
  );
}
