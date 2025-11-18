"use client";

import NotFound from "@/app/not-found";
import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";

import Divider from "@mui/material/Divider";

import { players } from "@/data/players.json";

import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  /* return NotFound; */

  const player = players.filter((player) => {
    if (player.id === id) return player
  })[0];

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {player.name}
        </h1>
        <h2 className="text-2xl font-semibold  text-neutral-900 text-center -m-4">
          {player.teamName}
        </h2>
      </div>
      <Divider sx={{ borderBottomWidth: 3, my: 3 }} />
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Wins" value={player.wins} />
        <InfoItem label="Losses" value={player.losses} />
        <InfoItem label="Draws" value={player.draws} />
        <InfoItem label="Played" value={player.played} />
        <InfoItem label="Win Percentage" value={player.winPercentage} />
        <InfoItem label="Goals" value={player.goals} />
        <InfoItem label="Assists" value={player.assists} />
        <InfoItem label="Discipline" value={`Y (${player.cards.yellow}) R (${player.cards.red})`} />
        <InfoItem label="Shirt Number" value={player.shirtNumber} />
        <InfoItem label="Position" value={player.position} />
        <InfoItem label="Age" value={player.age} />
        <InfoItem label="Joined Team" value={player.joinedTeam} />
      </div>
    </div>
  );
}
