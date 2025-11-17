"use client";

import NotFound from "@/app/not-found";
import InfoItem from "@/components/statistics/InfoItem";
import { TeamCardInterface } from "@/components/team/TeamCard";
import TeamLogo from "@/components/team/TeamLogo";
import { fetchTeamById } from "@/lib/fetchTeam";

import Divider from "@mui/material/Divider";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [team, setTeam] = useState<TeamCardInterface |null>(null);
  
  useEffect(()=> {
    fetchTeamById(id as string).then((data)=> setTeam(data));
  },[id])

  if (!team) return <NotFound />;

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {team.name}
        </h1>
      </div>
      <Divider sx={{ borderBottomWidth: 3, my: 3 }} />
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Contact Person" value="john Doe" />
        <InfoItem label="Leader" value="John Doe" />
        <InfoItem label="Coach" value="Jane Doe" />
        <InfoItem label="Established" value= {team.yearEstablished} />
        <InfoItem label="Squad Size" value= {team.size} />
        <InfoItem label="Assistant" value="John Doe" />
      </div>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Description
        </h3>
        <p className="text-sm leading-6 text-neutral-700">
          This is the profile page from {team.name} representing football for {team.department}, with {team.size} members. 
        </p>
      </section>
      <section className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-base font-semibold text-neutral-900 mb-1">
          Players
        </h3>
        <p>{team.members}</p>
      </section>
    </div>
  );
}
