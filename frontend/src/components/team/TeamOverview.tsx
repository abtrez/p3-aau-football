"use client";

import fetchTeams from "@/lib/fetchTeam";
import TeamCard, { TeamCardInterface } from "@/components/team/TeamCard";
import type { Team } from "@/lib/schemas/teamSchema";
import { useState, useEffect } from "react";

interface TeamOverviewProps {
  teams: Team[];
}

export default function TeamOverview({ teams }: TeamOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTeams().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Is Loading</p>;
  console.log(data);
  return (
    <div className="grid gap-4">
      {data.map((t: TeamCardInterface) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}
