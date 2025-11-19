"use client";

import NotFound from "@/app/not-found";
import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";

import Divider from "@mui/material/Divider";

import { useParams } from "next/navigation";

import { fetchPersonById } from "@/lib/fetchPerson";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();

  if (!id) return <NotFound />;

  const idParam = Array.isArray(id) ? id[0] : id;

  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    if (!idParam) return;
    fetchPersonById(idParam).then((data) => setPlayer(data));
  }, [idParam]);

  if (player == null) {
    return <p>loading</p>
  }

  return (
    <div className="container overflow-auto">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {player.firstName} {player.lastName}
        </h1>
        <h2 className="text-2xl font-semibold  text-neutral-900 text-center -m-4">
          {player.team ? player.team.name : "No team"}
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
